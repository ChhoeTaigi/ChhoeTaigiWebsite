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
        }
    },

    'search.singleDic'(dic, options) {
        if (Meteor.isServer) {
            return new Promise((resolve, reject) => {
                options = cleanOptions(options);

                let query = searchBrief(dic, options);
                if (query.length === 0) {
                    resolve([]);
                } else {
                    query.catch(error => reject(error))
                    .then(result => {
                        rtnArray = [{
                            dic: dic,
                            words: result,
                        }];
                        resolve(rtnArray);
                    });
                }
            });
        }
    },

    'search.dicAndId'(dic, id) {
        if (Meteor.isServer) {
            return pg(dic).select('*').where({id: id});
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
        querys = [];
        for (let idx in dicsStruct) {
            let dic = dicsStruct[idx].name
            query = searchSingleAllField(dic, value);
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

function cleanParams(options) {
    let searchMethod = options.searchMethod;
    if (searchMethod)
        delete options.searchMethod;
    
    let spelling = options.spelling;
    if (spelling) {
        options[options.spellingMethod] = spelling;
        delete options.spellingMethod;
        delete options.spelling;
    }

    for (let key in options) {
        if (!options[key].trim())
            delete options[key];
    }
    
    if (searchMethod) {
        if (searchMethod === 'contains') {
            for (let key in options) {
                options[key] = '%' + options[key] + '%';
            }
        }
    }
        
    return options;
}

function searchBrief(dic, options, limit=-1) {
    let dicStruct = dicsStruct.filter(e => e.name===dic)[0];
    let columns = dicStruct.columns;
    let brief = dicStruct.brief;
    let briefArray = [];
    for (let key in brief) {
        briefArray.push(key);
    }
    const cmd = pg.select(briefArray);
    for (key in options) {
        if (key === 'id')
            cmd.andWhere(key, options[key]);
        else if (key in columns)
            cmd.andWhere(key, 'like', options[key]);
    }
    cmd.from(dic)
    if (limit >= 0)
        cmd.limit(limit);
    return cmd;
}

function searchSingleAllField(dic, option) {
    let dicStruct = dicsStruct.filter(e => e.name===dic)[0];
    let columns = dicStruct.columns;
    let brief = dicStruct.brief;
    let briefArray = [];
    for (let key in brief) {
        briefArray.push(key);
    }
    const cmd = pg.select(briefArray);
    for (key in columns) {
        if (key !== 'id')
            cmd.orWhere(key, 'like', option);
    }
    cmd.from(dic)
    return cmd;
}
