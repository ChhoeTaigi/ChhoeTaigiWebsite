import postgres from '../database/postgres';
import dicStruct from '../dicts/dictionary-struct';

import { Logger }     from 'meteor/ostrio:logger';
import { LoggerConsole } from 'meteor/ostrio:loggerconsole';
import { LoggerFile } from 'meteor/ostrio:loggerfile';

const enableLogger = false;
const enableFileLogger = false;

var log;
if (enableLogger) {
    log = new Logger();
    new LoggerConsole(log).enable();
}
if (enableLogger && enableFileLogger) {
    if (Meteor.isProduction) {
        new LoggerFile(log, {
            path: '/data/logs/'
        }).enable({
            enable: true,
            filter: ['*'], // Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', '*'
            client: false, // Set to `false` to avoid Client to Server logs transfer
            server: true  // Allow logging on server
        });
    } else {
        new LoggerFile(log, {
            path: './logs/'
        }).enable({
            enable: true,
            filter: ['*'], // Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', '*'
            client: false, // Set to `false` to avoid Client to Server logs transfer
            server: true  // Allow logging on server
        });
    }
}

Meteor.methods({
    'search'(options) {
        if (Meteor.isServer) {
            let method = options.method;
            options = processSearchMethod(options);
            options = processBasicSearchColumns(options);
            options = cleanEmptyColumns(options);
            options = preprocessRegex(options);

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
        }
    },

    'search.dicAndId'(dic, id) {
        if (Meteor.isServer) {
            return postgres(dic).select('*').where({DictWordID: id}).limit(1);
        }
    },
});

// equals / contains
function processSearchMethod(options) {
    if (options.searchMethod === 'equals') {
        if (options.value !== undefined) {
            // all fields
            if (/\S/.test(options.value)) {
                options.value = '(?:^|.*\/)' + options.value + '(?:\\(?:.*\\))?(?:\/.*|$)?';
            }
        } else if (options.columns !== undefined) {
            for (let key in options.columns) {
                if (/\S/.test(options.columns[key])) {
                    console.log(key);
                    if (key === "spelling" || key === "PojInput" || key === "PojInputOthers" || key === "KipInput" || key === "KipInputOthers" || key === "PojUnicode" || key === "PojUnicodeOthers" || key === "KipUnicode" || key === "KipUnicodeOthers") {
                        options.columns[key] = '(?:^|.*\/)' + options.columns[key] + '(?:\\(?:.*\\))?(?:\/.*|$)';
                        console.log(options.columns[key]);
                    } else {
                        options.columns[key] = '^' + options.columns[key] + '$';
                    }
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

// regex
function preprocessRegex(options) {
    const soouSianntiau = '(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7)?';
    const imchat = '(?:(?![ -]).)+';
    const hyphenOrSpace = '(?: |--|-)';

    const regexRedundantSianntiau = new RegExp('(?<!\\\\)(?:1|4)', 'g');
    const regexHyphenOrSpace = new RegExp('[ -]', 'g');
    const regexSianntiauTaibe = new RegExp('\\%', 'g');
    const regexImchatTaibe = new RegExp('~', 'g');

    if (options.value !== undefined) {
        options.value = options.value.replace(regexRedundantSianntiau, '');
        options.value = options.value.replace(regexHyphenOrSpace, hyphenOrSpace);
        options.value = options.value.replace(regexSianntiauTaibe, soouSianntiau);
        options.value = options.value.replace(regexImchatTaibe, imchat);

    } else if (options.columns !== undefined) {
        for (let key in options.columns) {
            if (key === "PojInput" || key === "PojInputOthers" || key === "KipInput" || key === "KipInputOthers") {
                options.columns[key] = options.columns[key].replace(regexRedundantSianntiau, '');
                options.columns[key] = options.columns[key].replace(regexHyphenOrSpace, hyphenOrSpace);
                options.columns[key] = options.columns[key].replace(regexSianntiauTaibe, soouSianntiau);
                options.columns[key] = options.columns[key].replace(regexImchatTaibe, imchat);
            } else if (key === "PojUnicode" || key === "PojUnicodeOthers" || key === "KipUnicode" || key === "KipUnicodeOthers") {
                options.columns[key] = options.columns[key].replace(regexRedundantSianntiau, '');
                options.columns[key] = options.columns[key].replace(regexHyphenOrSpace, hyphenOrSpace);
                options.columns[key] = options.columns[key].replace(regexImchatTaibe, imchat);
            }
        }
    }

    return options;
}

// lowercase query
function lowerQeury(key) {
    return postgres.raw('LOWER(\"' + key + '\")');
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
    const briefArray = ['DictWordID'];
    for (let key in brief) {
        briefArray.push(key);
    }
    
    const columns = options.columns;
    // check valid columns
    let valid = false;
    for (let key in columns) {
        if ((key in dicColumns)
            || (key === 'hoabun' && 'HoaBun' in dicColumns)
            || (key === 'english' && 'EngBun' in dicColumns)
            || ((key === 'taibun') && (('HanLoTaibunPoj' in dicColumns) || ('HanLoTaibunKip' in dicColumns)))) {
            valid = true;
            break;
        }
    }

    if (!valid) {
        console.log("basicSearch invalid");
        return {
            dic: dic,
            num: 0,
            words: [],
        };
    }
  
    const query = queryCondictionBasic(options);
    query.select(briefArray);

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

// all field search
function searchAllField(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name===dic);
    const columns = struct.columns;
    const brief = struct.brief;
    const briefArray = ['DictWordID'];
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

    const query = queryCondictionAllField(options);
    query.select(briefArray);

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

function searchAllFields(options) {
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

// single dictionary search
function searchSingleDic(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name === dic);
    const dicColumns = struct.columns;
    const brief = struct.brief;
    const briefArray = ['DictWordID'];
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
    
    const query = queryCondictionSingleDic(options);
    query.select(briefArray);

    query.limit(options.limit);
    if (options.offset) {
        query.offset(options.offset);
    }

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

// query result number
function searchBasicNo(options) {
    const query = queryCondictionBasic(options);

    query.count('DictWordID as num');
    
    return query;
}

function searchAllFieldNo(options) {
    const query = queryCondictionAllField(options);
    query.count('DictWordID as num');

    return query;
}

function searchSingleDicNo(options) {
    const query = queryCondictionSingleDic(options);
    query.count('DictWordID as num');

    return query;
}

// query condition
function queryCondictionBasic(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name === dic);
    const dicColumns = struct.columns;
    const columns = options.columns;

    console.log("queryCondictionBasic: "+ dic);

    const query = postgres.from(dic);
    for (let key in columns) {
        console.log("key = "+key+", columns[key] = "+columns[key]);

        if (key === 'taibun') {
            if ('HanLoTaibunPoj' in dicColumns)
                query.orWhere(lowerQeury('HanLoTaibunPoj'), '~*', lowerStr(columns[key]));
            if ('HanLoTaibunKip' in dicColumns)
                query.orWhere(lowerQeury('HanLoTaibunKip'), '~*', lowerStr(columns[key]));
        } else if (key === "PojInput" && 'PojInputOthers' in dicColumns) {
            // if ('HanLoTaibunPoj' in dicColumns) {}
            query.andWhere(function() {
                this.where(lowerQeury('PojInput'), '~*',  lowerStr(columns[key])).orWhere(lowerQeury('PojInputOthers'), '~*',  lowerStr(columns[key]));
            });
        } else if (key === "KipInput" && 'KipInputOthers' in dicColumns) {
            query.andWhere(function() {
                this.where(lowerQeury('KipInput'), '~*',  lowerStr(columns[key])).orWhere(lowerQeury('KipInputOthers'), '~*',  lowerStr(columns[key]));
            });
        } else if (key === "PojUnicode" && 'PojUnicodeOthers' in dicColumns) {
            // if ('HanLoTaibunPoj' in dicColumns) {}
            query.andWhere(function() {
                this.where(lowerQeury('PojUnicode'), '~*',  lowerStr(columns[key])).orWhere(lowerQeury('PojUnicodeOthers'), '~*',  lowerStr(columns[key]));
            });
        } else if (key === "KipUnicode" && 'KipUnicodeOthers' in dicColumns) {
            query.andWhere(function() {
                this.where(lowerQeury('KipUnicode'), '~*',  lowerStr(columns[key])).orWhere(lowerQeury('KipUnicodeOthers'), '~*',  lowerStr(columns[key]));
            });
        } else if (key === 'english') {
            if ('EngBun' in dicColumns) {
                query.andWhere(lowerQeury('EngBun'), '~*', lowerStr(columns[key]));
                console.log("queryCondictionBasic: Engbun");
            }
        } else if (key === 'hoabun') {
            if ('HoaBun' in dicColumns) {
                query.andWhere(lowerQeury('HoaBun'), '~*', lowerStr(columns[key]));
                console.log("queryCondictionBasic: HoaBun");
            }
        } else {
            query.andWhere(lowerQeury(key), '~*',  lowerStr(columns[key]));
            console.log("queryCondictionBasic: else");
        }
    }
    return query;
}

function queryCondictionAllField(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name===dic);
    const columns = struct.columns;

    const query = postgres.from(dic);
    for (key in columns) {
        if (key !== 'DictWordID'
            && key !== 'StoreLink'
            && key !== 'GoanchhehPoochhiongChuliau')
            query.orWhere(lowerQeury(key), '~*', lowerStr(options.value));
    }
    return query;
}

function queryCondictionSingleDic(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name === dic);
    const dicColumns = struct.columns;
    const columns = options.columns;

    const query = postgres.from(dic);
    for (let key in columns) {
        if (key === 'DictWordID') {
            var keyNumber = columns[key].replace(/[^\d.-]/g, '');;
            query.andWhere(key, keyNumber);
        } else if (key in dicColumns) {
            query.andWhere(lowerQeury(key), '~*', lowerStr(columns[key]));
        }
    }

    return query;
}
