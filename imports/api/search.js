import pg from './pg';
import dicsStruct from './dictionary_struct';

Meteor.methods({
    'search.basic'(options) {
        if (Meteor.isServer) {
            const searchLimit = 3;
            options = cleanOptions(options);

            querys = [];
            for (let idx in dicsStruct) {
                let dic = dicsStruct[idx].name
                query = searchBrief(dic, options, searchLimit);
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
                    resolve(rtnArray)
                });
            });
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

function cleanOptions(options) {
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
