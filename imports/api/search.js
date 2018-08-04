import pg from './pg';
import dic_struct from './dictionary_struct';
import { resolve } from 'url';

Meteor.methods({
    'search.all'(params) {
        if (Meteor.isServer) {
            const searchLimit = 3;

            let searchMethod = params.searchMethod;
            delete params.searchMethod;
            params[params.spellingMethod] = params.spelling;
            delete params.spellingMethod;
            delete params.spelling;

            for (let key in params) {
                if (!params[key].trim())
                    delete params[key];
            }

            if (searchMethod === 'contains') {
                for (let key in params) {
                    params[key] = '%' + params[key] + '%';
                }
            }

            return new Promise((resolve, reject) => {
                results = [];
                for (let idx in dic_struct) {
                    let dic = dic_struct[idx].name
                    const cmd = pg.select('*');
                    for (key in params) {
                        cmd.andWhere(key, 'like', params[key])
                    }
                    cmd.from(dic).limit(searchLimit).then((result) => {
                        results.push({
                            dic: dic,
                            lists: result,
                        });
                        if (results.length === dic_struct.length)
                            resolve(results);
                    }).catch((error) => {
                        reject(error);
                    });
                }
            })

            /*
            const cmd = pg.select('*');
            for (key in params) {
                cmd.andWhere(key, 'like', params[key])
            }
            cmd.from('TaibunHoabunSoanntengSutian');
            //return cmd;
            return cmd.limit(100);
            */
        }
    }
});