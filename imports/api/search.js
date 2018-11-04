import pg from './pg';
import dicStruct from './dictionary_struct';

Meteor.methods({
    'search'(options) {
        let method = options.method;
        options = processSearchMethod(options);
        options = processBasicSearchColumns(options);
        options = cleanEmptyColumns(options);
        options = processWildcard(options);

        if (method === 'basic') {
            if (options.dic) {
                const limit = 30;
                options.limit = limit;
                options.offset = ((options.page || 1) - 1) * limit;
                return basicSearch(options);
            } else
                return basicSearches(options);
        } else if (method === 'all-field') {
            if (options.dic) {
                const limit = 30;
                options.limit = limit;
                options.offset = ((options.page || 1) - 1) * limit;
                return searchAllField(options);
            } 
            else
                return searchAllFields(options);
        } else if (method === 'single-dic') {
            const limit = 30;
            options.limit = limit;
            options.offset = ((options.page || 1) - 1) * limit;
            return searchSingleDic(options);
        }
    },

    'search.dicAndId'(dic, id) {
        if (Meteor.isServer) {
            return pg(dic).select('*').where({id: id}).limit(1);
        }
    },
});

// equals / contains
function processSearchMethod(options) {
    if (options.searchMethod === 'contains') {
        if (options.value !== undefined) {
            // all fields
            if (/\S/.test(options.value)) {
                options.value = '%' + options.value + '%';
            }
        } else if (options.columns !== undefined) {
            for (let key in options.columns) {
                if (/\S/.test(options.columns[key])) {
                    options.columns[key] = '%' + options.columns[key] + '%';
                }
            }
        }
    }
    return options;
}

// spellingMethod
function processBasicSearchColumns(options) {
    if (options.spellingMethod) {
        options.columns[options.spellingMethod] = options.columns.spelling;
        delete options.columns.spelling;
    }
    return options;
}

// check '  ' or undefined
function cleanEmptyColumns(options) {
    if (options.columns !== undefined) {
        for (let key in options.columns) {
            if (!/\S/.test(options.columns[key]) || (options.columns[key] === undefined)) {
                delete options.columns[key];
            }
        }
    } else if (options.value !== undefined) {
        if (!/\S/.test(options.value) || (options.value === undefined)) {
            delete options.value;
        }
    }
    return options;
}

// wildcard
function processWildcard(options) {
    const reM = new RegExp('\\*', 'g');
    const reP = new RegExp('\\+', 'g');

    if (options.value !== undefined) {
        options.value = options.value.replace(reM, '%');
        options.value = options.value.replace(reP, '_');
    } else if (options.columns !== undefined) {
        for (let key in options.columns) {
            options.columns[key] = options.columns[key].replace(reM, '%');
            options.columns[key] = options.columns[key].replace(reP, '_');
        }
    }

    return options;
}

// lowercase query
function lowerQeury(key) {
    return pg.raw('LOWER(\"' + key + '\")');
}
function lowerStr(str) {
    return str.toLowerCase();
}

// basic search
function basicSearch(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name === dic);
    const dicColumns = struct.columns;
    const brief = struct.brief;
    const briefArray = ['id'];
    for (let key in brief) {
        briefArray.push(key);
    }
    
    const columns = options.columns;
    // check valid columns
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
        if (key === 'taibun') {
            if ('hanlo_taibun_poj' in dicColumns)
                query.orWhere(lowerQeury('hanlo_taibun_poj'), 'like', lowerStr(columns[key]));
            if ('hanlo_taibun_kiplmj' in dicColumns)
                query.orWhere(lowerQeury('hanlo_taibun_kiplmj'), 'like', lowerStr(columns[key]));
            if ('hanji_taibun' in dicColumns)
                query.orWhere(lowerQeury('hanji_taibun'), 'like', lowerStr(columns[key]));
        } else if (key in dicColumns) {
            query.andWhere(lowerQeury(key), 'like',  lowerStr(columns[key]));
        }
    }

    query.from(dic)
    if (options.limit) {
        query.limit(options.limit);
    }
    if (options.offset) {
        query.offset(options.offset);
    }

    const queryNo = searchBasicNo(options);

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

function basicSearches(options) {
    if (Meteor.isServer) {
        const limit = 20;
        options.limit = limit;

        querys = [];
        for (let idx in dicStruct) {
            let dic = dicStruct[idx].name
            options.dic = dic;
            query = basicSearch(options);
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

// all field search
function searchAllField(options) {
    if (Meteor.isServer) {
        const dic = options.dic;
        const struct = dicStruct.find(e => e.name===dic);
        const columns = struct.columns;
        const brief = struct.brief;
        const briefArray = ['id'];
        for (let key in brief) {
            briefArray.push(key);
        }

        // check valid input
        if (!/\S/.test(options.value) || (options.value === undefined))
            return {
                dic: dic,
                num: 0,
                words: [],
            };

        const query = pg.select(briefArray);
        for (key in columns) {
            if (key !== 'id')
                query.orWhere(lowerQeury(key), 'like', lowerStr(options.value));
        }
        query.from(dic)
        if (options.limit) {
            query.limit(options.limit);
        }
        if (options.offset) {
            query.offset(options.offset);
        }

        const queryNo = searchAllFieldNo(options);
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

function searchAllFields(options) {
    if (Meteor.isServer) {
        const limit = 20;
        options.limit = limit;

        querys = [];
        for (let idx in dicStruct) {
            let dic = dicStruct[idx].name
            options.dic = dic;
            query = searchAllField(options);
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

// single dictionary search
function searchSingleDic(options) {
    if (Meteor.isServer) {
        const dic = options.dic;
        const struct = dicStruct.find(e => e.name === dic);
        const dicColumns = struct.columns;
        const brief = struct.brief;
        const briefArray = ['id'];
        for (let key in brief) {
            briefArray.push(key);
        }
        
        const columns = options.columns;
        // check valid columns
        let valid = false;
        for (let key in columns) {
            if (key in dicColumns) {
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
            else if (key in dicColumns)
                query.andWhere(lowerQeury(key), 'like', lowerStr(columns[key]));
        }
        query.from(dic)
        query.limit(options.limit);
        query.offset(options.offset || 0);

        const queryNo = searchSingleDicNo(options);

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

// query result number
function searchBasicNo(options) {
    const dic = options.dic;
    const dicColumns = dicStruct.find(e => e.name === dic).columns;
    const columns = options.columns;

    const query = pg.count('id as num');
    for (let key in columns) {
        if (key === 'taibun') {
            if ('hanlo_taibun_poj' in dicColumns)
                query.orWhere(lowerQeury('hanlo_taibun_poj'), 'like', lowerStr(columns[key]));
            if ('hanlo_taibun_kiplmj' in dicColumns)
                query.orWhere(lowerQeury('hanlo_taibun_kiplmj'), 'like', lowerStr(columns[key]));
            if ('hanji_taibun' in dicColumns)
                query.orWhere(lowerQeury('hanji_taibun'), 'like', lowerStr(columns[key]));
        } else if (key in dicColumns) {
            query.andWhere(lowerQeury(key, 'like'), lowerStr(columns[key]));
        }
    }
    query.from(dic)
    return query;
}

function searchAllFieldNo(options) {
    const dic = options.dic;
    let columns = dicStruct.find(e => e.name===dic).columns;
    const value = options.value;
    const query = pg.count('id as num');
    for (key in columns) {
        if (key !== 'id')
        query.orWhere(lowerQeury(key), 'like', lowerStr(value));
    }
    query.from(dic)
    return query;
}

function searchSingleDicNo(options) {
    const dic = options.dic;
    const dicColumns = dicStruct.find(e => e.name === dic).columns;
    const columns = options.columns;

    const query = pg.count('id as num');
    for (let key in columns) {
        if (key === 'id')
        query.andWhere(key, columns[key]);
        else if (key in dicColumns)
        query.andWhere(lowerQeury(key), 'like', lowerStr(columns[key]));
    }
    query.from(dic)
    return query;
}
