import pg from './pg';
import dicsStruct from './dictionary_struct';

// Input:
// options: {
//     method: 'singleDic',
//     dic: 'TaiJitToaSuTian',
//     poj_unicode: 'a',
// }

// Output:
// allResults: {
//     [
//         dic: 'TaiJitToaSuTian',
//         words: [],
//     ],
// }

Meteor.methods({
    'search'(options) {
        let method = options.method;
        if (method === 'allField') {
            if (options.dic)
                return new Promise((resolve, reject) => {
                    searchSingleAllField(options.dic, options.value)
                    .catch(error => reject(error))
                    .then(result => {
                        rtn = {
                            dic: options.dic,
                            words: result,
                        };
                        resolve(rtn);
                    });
                });
            else
                return searchAllField(options.value);
        } else if (method === 'basic') {
            let params = options.params;
            if (options.dic) {
                params = cleanParams(params);
                query = searchBrief(options.dic, params);

                return new Promise((resolve, reject) => {
                    query
                    .catch(error => reject(error))
                    .then(result => {
                        rtn = {
                            dic: options.dic,
                            words: result,
                        };
                        resolve(rtn);
                    });
                });
            } else
                return basicSearch(params);
        } else if (method === 'singleDic') {
            return searchSingleDic(options.dic, options.params);
        }
    },

    'search.dicAndId'(dic, id) {
        if (Meteor.isServer) {
            return pg(dic).select('*').where({id: id}).limit(1);
        }
    },
});

function basicSearch(params) {
    if (Meteor.isServer) {
        const searchLimit = 3;
        params = cleanParams(params);

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
                rtnArray = dicsStruct.map((e, i) => ({
                    dic: e.name,
                    words: results[i],
                }));
                resolve(rtnArray);
            });
        });
    }
}

function searchAllField(value) {
    if (Meteor.isServer) {
        const searchLimit = 3;
        querys = [];
        for (let idx in dicsStruct) {
            let dic = dicsStruct[idx].name
            query = searchSingleAllField(dic, value, searchLimit);
            querys.push(query);
        }

        return new Promise((resolve, reject) => {
            Promise.all(querys)
            .catch(error => reject(error))
            .then(results => {
                rtnArray = dicsStruct.map((e, i) => ({
                    dic: e.name,
                    words: results[i],
                }));
                resolve(rtnArray);
            });
        });
    }
}

function searchSingleDic(dic, params) {
    if (Meteor.isServer) {
        return new Promise((resolve, reject) => {
            params = cleanParams(params);

            let query = searchBrief(dic, params);
            query
            .catch(error => reject(error))
            .then(result => {
                rtn = {
                    dic: dic,
                    words: result,
                };
                resolve(rtn);
             });
        });
    }
}

function cleanParams(params) {
    let searchMethod = params.searchMethod;
    if (searchMethod)
        delete params.searchMethod;
    
    let spelling = params.spelling;
    if (spelling) {
        params[params.spellingMethod] = spelling;
        delete params.spellingMethod;
        delete params.spelling;
    }

    for (let key in params) {
        if (!params[key].trim())
            delete params[key];
    }

    // wildcard charactors
    for (let key in params) {
        params[key] = cleanWildcard(params[key]);
    }
    
    if (searchMethod) {
        if (searchMethod === 'contains') {
            for (let key in params) {
                params[key] = '%' + params[key] + '%';
            }
        }
    }
        
    return params;
}

function cleanWildcard(value) {
    const reM = new RegExp('\\*', 'g');
    const reP = new RegExp('\\+', 'g');
    value = value.replace(reM, '%');
    value = value.replace(reP, '_');
    return value;
}

function searchBrief(dic, params, limit=-1) {
    let dicStruct = dicsStruct.filter(e => e.name===dic)[0];
    let columns = dicStruct.columns;
    let brief = dicStruct.brief;
    let briefArray = ['id'];
    for (let key in brief) {
        briefArray.push(key);
    }

    // check params is in valid columns
    let valid = false;
    for (let key in params) {
        if (key in columns) {
            valid = true;
            break;
        }
    }
    if (!valid)
        return [];

    const cmd = pg.select(briefArray);
    for (let key in params) {
        if (key === 'id')
            cmd.andWhere(key, params[key]);
        else if (key in columns)
            cmd.andWhere(key, 'like', params[key]);
    }
    cmd.from(dic)
    if (limit >= 0)
        cmd.limit(limit);
    return cmd;
}

function searchSingleAllField(dic, value, limit=-1) {
    if (Meteor.isServer) {
        let dicStruct = dicsStruct.filter(e => e.name===dic)[0];
        let columns = dicStruct.columns;
        let brief = dicStruct.brief;
        let briefArray = [];
        for (let key in brief) {
            briefArray.push(key);
        }

        // check params is in valid columns
        if (value.trim() === '')
            return [];

        value = cleanWildcard(value);
        const cmd = pg.select(briefArray);
        for (key in columns) {
            if (key !== 'id')
                cmd.orWhere(key, 'like', value);
        }
        cmd.from(dic)
        if (limit >= 0)
            cmd.limit(limit);
        return cmd;
    }
}
