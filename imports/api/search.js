import pg from './pg';
import dicStruct from './dictionary_struct';

Meteor.methods({
    'search.basic'(params) {
        if (Meteor.isServer) {
            const searchLimit = 3;
            params = cleanParams(params);

            querys = [];
            for (let idx in dicStruct) {
                let dic = dicStruct[idx].name
                query = search(params, dic, searchLimit);
                querys.push(query);
            }

            return new Promise((resolve, reject) => {
                Promise.all(querys)
                .catch(error => reject(error))
                .then(results => {
                    rtnArray = dicStruct.map((e, i) => ({
                        dic: e.name,
                        words: results[i],
                    }));
                    resolve(rtnArray)
                });
            });
        }
    },

    'search.singleDic'(params, dic) {
        if (Meteor.isServer) {
            return new Promise((resolve, reject) => {
                params = cleanParams(params);

                let query = search(params, dic);
                if (query.length === 0) {
                    resolve(query);
                } else {
                    query.catch(error => reject(error))
                    .then(result => {
                        rtnArray = [{
                            dic: dic,
                            results: result,
                        }];
                        resolve(rtnArray);
                    });
                }
            });
        }
    },

    'search.single.single'(dic, id) {
        if (Meteor.isServer) {
            return pg(dic).select('*').where({id: id});
        }
    },
});

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
    
    if (searchMethod) {
        if (searchMethod === 'contains') {
            for (let key in params) {
                params[key] = '%' + params[key] + '%';
            }
        }
    }
        
    return params;
}

function search(params, dic, limit=-1) {
    let columns = dicStruct.filter(e => e.name===dic)[0].columns;
    const cmd = pg.select('*');
    for (key in params) {
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
