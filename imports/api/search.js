import pg from './pg';
import dicsStruct from './dictionary_struct';

// Input:
// options = {
//     method: 'singleDic',
//     params: {
//         dic: 'TaiJitToaSuTian',
//         columns: {
//             poj_input: 'a',
//         }
//     }
// }

// Output:
// allResults = {
//     [
//         {
//             dic: 'TaiJitToaSuTian',
//             num: 0,
//             words: []
//         }
//     ],
// }

Meteor.methods({
    'search'(options) {
        let method = options.method;
        let params = processSearchMethod(options.params);
        params = processBasicSearchColumns(params);
        params = cleanEmptyColumns(params);
        params = validateColumns(params);
        params = processWildcard(params);
        
        if (method === 'basic') {
            if (params.dic) {
                const limit = 30;
                let offset = params.offset * limit;
                if (offset === undefined)
                    offset = 0;

                return searchBrief(params.dic, params, limit, offset);
            } else
                return basicSearch(params);
        } else if (method === 'allField') {
            if (params.dic) {
                const limit = 30;
                let offset = params.offset * limit;
                if (offset === undefined)
                    offset = 0;
                return searchSingleAllField(params.dic, params, limit, offset);
            } 
            else
                return searchAllField(params);
        } else if (method === 'singleDic') {
            return searchSingleDic(params.dic, params);
        }
    },

    'search.dicAndId'(dic, id) {
        if (Meteor.isServer) {
            return pg(dic).select('*').where({id: id}).limit(1);
        }
    },
});

// equals / contains
function processSearchMethod(params) {
    if (params.searchMethod === 'contains') {
        if (params.value !== undefined) {
            if (/\S/.test(params.value)) {
                params.value = '%' + params.value + '%';
            }
        } else if (params.columns !== undefined) {
            for (let key in params.columns) {
                if (/\S/.test(params.columns[key])) {
                    params.columns[key] = '%' + params.columns[key] + '%';
                }
            }
        }
    }
    return params;
}

// spellingMethod
function processBasicSearchColumns(params) {
    if (params.spellingMethod) {
        params.columns[params.spellingMethod] = params.columns.spelling;
        delete params.columns.spelling;
    }
    return params;
}

// check '  '
function cleanEmptyColumns(params) {
    if (params.columns !== undefined) {
        for (let key in params.columns) {
            if (!/\S/.test(params.columns[key])) {
                delete params.columns[key];
            }
        }
    } else if (params.value !== undefined) {
        if (!/\S/.test(params.value)) {
            delete params.value;
        }
    }
    return params;
}

// check columns exist
function validateColumns(params) {
    if (params.dic !== undefined) {
        if (params.columns !== undefined) {
            const dicColumns = dicsStruct.filter(e => e.name === params.dic)[0].columns;
            for (let key in params.columns) {
                if (!(key in dicColumns)) {
                    delete params.columns[key];
                }
            }
        }
    }
    return params;
}

// wildcard
function processWildcard(params) {
    const reM = new RegExp('\\*', 'g');
    const reP = new RegExp('\\+', 'g');

    if (params.value !== undefined) {
        params.value = params.value.replace(reM, '%');
        params.value = params.value.replace(reP, '_');
    } else if (params.columns !== undefined) {
        for (let key in params.columns) {
            params.columns[key] = params.columns[key].replace(reM, '%');
            params.columns[key] = params.columns[key].replace(reP, '_');
        }
    }

    return params;
}

function basicSearch(params) {
    if (Meteor.isServer) {
        const searchLimit = 20;

        querys = [];
        for (let idx in dicsStruct) {
            let dic = dicsStruct[idx].name
            query = searchBrief(dic, params, searchLimit);
            querys.push(query);
        }

        return new Promise((resolve, reject) => {
            Promise.all(querys)
            .catch(error => reject(error))
            .then(results => {
                resolve(results);
            });
        });
    }
}

function searchAllField(params) {
    if (Meteor.isServer) {
        const searchLimit = 20;
        querys = [];
        for (let idx in dicsStruct) {
            let dic = dicsStruct[idx].name
            query = searchSingleAllField(dic, params, searchLimit);
            querys.push(query);
        }

        return new Promise((resolve, reject) => {
            Promise.all(querys)
            .catch(error => reject(error))
            .then(results => {
                resolve(results);
            });
        });
    }
}

function searchSingleDic(dic, params) {
    if (Meteor.isServer) {
        const limit = 30;
        const offsetM = params.offset;
        let offset = 0;
        if (offsetM)
            offset = offsetM * limit;

        return searchBrief(dic, params, limit, offset);
    }
}

function searchBrief(dic, params, limit=-1, offset=0) {
    const dicStruct = dicsStruct.filter(e => e.name===dic)[0];
    const dicColumns = dicStruct.columns;
    const brief = dicStruct.brief;
    const briefArray = ['id'];
    for (let key in brief) {
        briefArray.push(key);
    }
    
    const columns = params.columns;
    // check params is in valid columns
    let valid = false;
    for (let key in columns) {
        if ((key in dicColumns) || ((key === 'taibun') && (('hanlo_taibun_poj' in dicColumns) || ('hanlo_taibun_kiplmj' in dicColumns) || ('hanji_taibun' in dicColumns)))) {
	    valid = true;
	    break;
	}
    }
    if (!valid)
        return {
            dic: dic,
            num: 0,
            words: [],
        };
  
    const query = pg.select(briefArray);
    for (let key in columns) {
        if (key === 'id')
            query.andWhere(key, columns[key]);
        else if (key === 'taibun') {
	    if ('hanlo_taibun_poj' in dicColumns)
		query.orWhere('hanlo_taibun_poj', 'like', columns[key]);
	    if ('hanlo_taibun_kiplmj' in dicColumns)
		query.orWhere('hanlo_taibun_kiplmj', 'like', columns[key]);
	    if ('hanji_taibun' in dicColumns)
		query.orWhere('hanji_taibun', 'like', columns[key]);
	} else if (key in dicColumns) {
	    query.andWhere(key, 'like', columns[key]);
	}
    }
    query.from(dic)
    if (limit >= 0)
    query.limit(limit);
    query.offset(offset);

    const queryNo = searchNo(dic, params);

    return new Promise((resolve, reject) => {
        Promise.all([queryNo, query])
        .catch(error => reject(error))
        .then(results => {
            rtn = {
                dic: dic,
                num: results[0][0].num,
                words: results[1],
            };
            resolve(rtn);
        });
    });
}

function searchSingleAllField(dic, params, limit=-1, offset=0) {
    if (Meteor.isServer) {
        const dicStruct = dicsStruct.filter(e => e.name===dic)[0];
        const columns = dicStruct.columns;
        const brief = dicStruct.brief;
        const briefArray = ['id'];
        for (let key in brief) {
            briefArray.push(key);
        }

        if (params.value === undefined)
            return {
                dic: dic,
                num: 0,
                words: [],
            };

        const query = pg.select(briefArray);
        for (key in columns) {
            if (key !== 'id')
                query.orWhere(key, 'like', params.value);
        }
        query.from(dic)
        if (limit >= 0)
            query.limit(limit);
        query.offset(offset);

        const queryNo = searchSingleAllFieldNo(dic, params);
        return new Promise((resolve, reject) => {
            Promise.all([queryNo, query])
            .catch(error => reject(error))
            .then(results => {
                rtn = {
                    dic: dic,
                    num: results[0][0].num,
                    words: results[1],
                };
                resolve(rtn);
            });
        });
    }
}

function searchNo(dic, params) {
    const dicColumns = dicsStruct.filter(e => e.name === dic)[0].columns;
    const columns = params.columns;

    const cmd = pg.count('id as num');
    for (let key in columns) {
        if (key === 'id')
            cmd.andWhere(key, columns[key]);
        else if (key in dicColumns)
            cmd.andWhere(key, 'like', columns[key]);
    }
    cmd.from(dic)
    return cmd;
}

function searchSingleAllFieldNo(dic, params) {
    let dicStruct = dicsStruct.filter(e => e.name===dic)[0];
    let columns = dicStruct.columns;
    const value = params.value;
    const cmd = pg.count('id as num');
    for (key in columns) {
        if (key !== 'id')
            cmd.orWhere(key, 'like', value);
    }
    cmd.from(dic)
    return cmd;
}
