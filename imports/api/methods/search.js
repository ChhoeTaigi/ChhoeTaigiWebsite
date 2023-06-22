import postgres from '../database/postgres';
import dicStruct from '../dicts/dictionary-struct';

import { Logger } from 'meteor/ostrio:logger';
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
            options = processBasicSearchColumns(options);
            options = cleanEmptyColumns(options);
            options = preprocessRegex(options);
            options = processSearchMethod(options);

            if (method === 'basic') {
                if (options.dic) {
                    const limit = 30;
                    options.limit = limit;
                    options.offset = ((options.page || 1) - 1) * limit;
                    return basicSearch(options);
                } else {
                    return basicSearches(options);
                }
            } else if (method === 'all-field') {
                if (options.dic) {
                    const limit = 30;
                    options.limit = limit;
                    options.offset = ((options.page || 1) - 1) * limit;
                    return searchAllField(options);
                } else {
                    return searchAllFields(options);
                }
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
            return postgres(dic).select('*').where({ DictWordID: id }).limit(1);
        }
    },
});

function processSearchMethod(options) {
    console.log("processSearchMethod()");

    if (options.searchMethod === 'equals') { // equals
        if (options.value !== undefined) {
            // search all
            if (/\S/.test(options.value)) {
                options.value = '(?:^|.*\/)' + options.value + '(?:\\(.*\\))?(?:\/.*|$)';
            }
        } else if (options.columns !== undefined) { // search common
            for (let key in options.columns) {
                if (/\S/.test(options.columns[key])) {
                    console.log("processSearchMethod() - options.columns - key: " + key);
                    if (key === "spelling" || key === "PojInput" || key === "PojInputOthers" || key === "KipInput" || key === "KipInputOthers" || key === "PojUnicode" || key === "PojUnicodeOthers" || key === "KipUnicode" || key === "KipUnicodeOthers") {
                        options.columns[key] = '(?:^|.*\/)' + options.columns[key] + '(?:\\(.*\\))?(?:\/.*|$)';
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
const regexStringSouSianntiau = '(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7|8)?';
const regexStringHyphenOrSpace = '(?: |--|-)';

const regexStringAhUnPrefix = '.*(?:(?<![aiueo]))';
const regexStringAhUnSuffix =  '(?:nn)?(?:2|3|h8|h|5|7|8)?$';
const regexStringKootengImchatPrefix = '(.* |^)';
const regexStringKootengImchatSuffix = '( .*|$)';

const regexpRedundantSianntiau = new RegExp('(?<!\\\\)(?:1|4)', 'g');
const regexpHyphenOrSpace = new RegExp('[ -]', 'g');
const regexpSianntiauTaibe = new RegExp('%', 'g');

const regexpKooImchatSiannthauTaibe = new RegExp('~<', 'g');
const regexpKooImchatHeksimKapBoeliuTaibe = new RegExp('~>', 'g');
const regexpKooImchatTaibeBoKhakteng = new RegExp('~x', 'g');
const regexpKooImchatTaibe = new RegExp('~', 'g');
const regexpStringKooImchatSiannthauTaibePrefix = '(?:ph|p|m|b|th|t|n|l|kh|k|ng|g|chh|ch|s|j|h)';
const regexpStringKooImchatHeksimKapBoeliuTaibeSuffix = '(?:[aiueo]+(?:nn|m|ng|n)*|(?:m|ng|g))(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7|8)?';
const regexStringKooImchatBoKhakteng = '(?:(?![ -\/]).)*';
const regexStringKooImchat = '(?:(?![ -\/]).)+';

const regexpStringSpecialChar1 = ' ';
const regexpStringSpecialChar2 = '-';
const regexpStringSpecialChar3 = '{';
const regexpStringSpecialChar4 = '}';
const regexpStringSpecialCharString1 = '\\\\ ';
const regexpStringSpecialCharString2 = '\\\\-';
const regexpStringSpecialCharString3 = '\\\\{';
const regexpStringSpecialCharString4 = '\\\\}';
const regexpStringSpecialChar1Temp = '####';
const regexpStringSpecialChar2Temp = '###';
const regexpStringSpecialChar3Temp = '##';
const regexpStringSpecialChar4Temp = '#';
const regexpSpecialChar1 = new RegExp(regexpStringSpecialCharString1, 'g');
const regexpSpecialChar2 = new RegExp(regexpStringSpecialCharString2, 'g');
const regexpSpecialChar3 = new RegExp(regexpStringSpecialCharString3, 'g');
const regexpSpecialChar4 = new RegExp(regexpStringSpecialCharString4, 'g');
const regexpSpecialChar1R = new RegExp(regexpStringSpecialChar1Temp, 'g');
const regexpSpecialChar2R = new RegExp(regexpStringSpecialChar2Temp, 'g');
const regexpSpecialChar3R = new RegExp(regexpStringSpecialChar3Temp, 'g');
const regexpSpecialChar4R = new RegExp(regexpStringSpecialChar4Temp, 'g');

function preprocessRegex(options) {
    console.log("preprocessRegex()");

    if (options.value !== undefined) {
        // console.log("preprocessRegex() - options.value");

        options.value = options.value.replace(regexpRedundantSianntiau, '');
        options.value = options.value.replace(regexpSianntiauTaibe, regexStringSouSianntiau);

        if (options.value.startsWith("{") && value.endsWith("}")) {
            options.value = options.value.replace('{', regexStringKootengImchatPrefix).replace('}', regexStringKootengImchatSuffix);
        }

        // Sūn-sū bē-tàng ōaⁿ
        options.value = options.value.replace(regexpSpecialChar1, regexpStringSpecialChar1Temp);
        options.value = options.value.replace(regexpSpecialChar2, regexpStringSpecialChar2Temp);
        options.value = options.value.replace(regexpSpecialChar3, regexpStringSpecialChar3Temp);
        options.value = options.value.replace(regexpSpecialChar4, regexpStringSpecialChar4Temp);
        options.value = options.value.replace(regexpHyphenOrSpace, regexStringHyphenOrSpace);
        options.value = options.value.replace(regexpKooImchatSiannthauTaibe, regexpStringKooImchatSiannthauTaibePrefix);
        options.value = options.value.replace(regexpKooImchatHeksimKapBoeliuTaibe, regexpStringKooImchatHeksimKapBoeliuTaibeSuffix);
        options.value = options.value.replace(regexpKooImchatTaibeBoKhakteng, regexStringKooImchatBoKhakteng);
        options.value = options.value.replace(regexpKooImchatTaibe, regexStringKooImchat);
        options.value = options.value.replace(regexpSpecialChar1R, regexpStringSpecialChar1);
        options.value = options.value.replace(regexpSpecialChar2R, regexpStringSpecialChar2);
        options.value = options.value.replace(regexpSpecialChar3R, regexpStringSpecialChar3);
        options.value = options.value.replace(regexpSpecialChar4R, regexpStringSpecialChar4);
    } else if (options.columns !== undefined) {
        // console.log("preprocessRegex() - options.columns");

        for (let key in options.columns) {
            if (/\S/.test(options.columns[key])) {
                // console.log("preprocessRegex() - options.columns - key:" + key);
                // console.log("preprocessRegex() - options.columns[key]:" + options.columns[key]);

                if (key === "PojInput" || key === "PojInputOthers" || key === "KipInput" || key === "KipInputOthers") {
                    options.columns[key] = options.columns[key].replace(regexpSianntiauTaibe, regexStringSouSianntiau);
                    lomajiColumnKeyQueryRegexProcess(options, key);
                } else if (key === "PojUnicode" || key === "PojUnicodeOthers" || key === "KipUnicode" || key === "KipUnicodeOthers") {
                    lomajiColumnKeyQueryRegexProcess(options, key);
                } else if (key === "english") {
                    if (options.columns[key].startsWith("{") && options.columns[key].endsWith("}")) {
                        options.columns[key] = options.columns[key].replace('{', regexStringKootengImchatPrefix).replace('}', regexStringKootengImchatSuffix);
                    }
                }
            }
        }
    }

    return options;
}

function lomajiColumnKeyQueryRegexProcess(options, key) {
    // console.log("lomajiColumnKeyQueryRegexProcess(), options.columns[key]: " + options.columns[key]);

    if (key === "PojInput" || key === "PojInputOthers" || key === "KipInput" || key === "KipInputOthers" ||
        key === "PojUnicode" || key === "PojUnicodeOthers" || key === "KipUnicode" || key === "KipUnicodeOthers") {
        // check pass
    } else {
        return;
    }

    options.columns[key] = options.columns[key].replace(regexpRedundantSianntiau, '');

    if (options.columns[key].includes("@")) {
        // console.log("@@@@@@@@@ key: " + options.columns[key]);

        if (options.columns[key].endsWith("@")) {
            un7bo2 = options.columns[key].replace('@', '');
            options.columns[key] = regexStringAhUnPrefix + un7bo2 + regexStringAhUnSuffix;
        }
    } else if (options.columns[key].startsWith("{") && options.columns[key].endsWith("}")) {
        options.columns[key] = options.columns[key].replace('{', regexStringKootengImchatPrefix).replace('}', regexStringKootengImchatSuffix);
    }

    // Sūn-sū bē-tàng ōaⁿ
    options.columns[key] = options.columns[key].replace(regexpSpecialChar1, regexpStringSpecialChar1Temp);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar2, regexpStringSpecialChar2Temp);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar3, regexpStringSpecialChar3Temp);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar4, regexpStringSpecialChar4Temp);
    options.columns[key] = options.columns[key].replace(regexpHyphenOrSpace, regexStringHyphenOrSpace);
    options.columns[key] = options.columns[key].replace(regexpKooImchatSiannthauTaibe, regexpStringKooImchatSiannthauTaibePrefix);
    options.columns[key] = options.columns[key].replace(regexpKooImchatHeksimKapBoeliuTaibe, regexpStringKooImchatHeksimKapBoeliuTaibeSuffix);
    options.columns[key] = options.columns[key].replace(regexpKooImchatTaibeBoKhakteng, regexStringKooImchatBoKhakteng);
    options.columns[key] = options.columns[key].replace(regexpKooImchatTaibe, regexStringKooImchat);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar1R, regexpStringSpecialChar1);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar2R, regexpStringSpecialChar2);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar3R, regexpStringSpecialChar3);
    options.columns[key] = options.columns[key].replace(regexpSpecialChar4R, regexpStringSpecialChar4);
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
            || ((key === 'jitbun') && (('JitBun' in dicColumns) || ('KaisoehJitbunPoj' in dicColumns) || ('LekuJitbunPoj' in dicColumns)))
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
    const struct = dicStruct.find(e => e.name === dic);
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

    console.log("queryCondictionBasic: " + dic);

    const query = postgres.from(dic);
    for (let key in columns) {
        console.log("key = " + key + ", columns[key] = " + columns[key]);

        if (key === 'taibun') {
            query.andWhere(function () {
                if ('HanLoTaibunPoj' in dicColumns) {
                    this.orWhere(lowerQeury('HanLoTaibunPoj'), '~*', lowerStr(columns[key]))
                }
                if ('HanLoTaibunKip' in dicColumns) {
                    this.orWhere(lowerQeury('HanLoTaibunKip'), '~*', lowerStr(columns[key]))
                }
            });
        } else if (key === "PojInput" && 'PojInputOthers' in dicColumns) {
            query.andWhere(function () {
                this.where(lowerQeury('PojInput'), '~*', lowerStr(columns[key])).orWhere(lowerQeury('PojInputOthers'), '~*', lowerStr(columns[key]));
            });
        } else if (key === "KipInput" && 'KipInputOthers' in dicColumns) {
            query.andWhere(function () {
                this.where(lowerQeury('KipInput'), '~*', lowerStr(columns[key])).orWhere(lowerQeury('KipInputOthers'), '~*', lowerStr(columns[key]));
            });
        } else if (key === "PojUnicode" && 'PojUnicodeOthers' in dicColumns) {
            query.andWhere(function () {
                this.where(lowerQeury('PojUnicode'), '~*', lowerStr(columns[key])).orWhere(lowerQeury('PojUnicodeOthers'), '~*', lowerStr(columns[key]));
            });
        } else if (key === "KipUnicode" && 'KipUnicodeOthers' in dicColumns) {
            query.andWhere(function () {
                this.where(lowerQeury('KipUnicode'), '~*', lowerStr(columns[key])).orWhere(lowerQeury('KipUnicodeOthers'), '~*', lowerStr(columns[key]));
            });
        } else if (key === 'english') {
            if ('EngBun' in dicColumns) {
                query.andWhere(lowerQeury('EngBun'), '~*', lowerStr(columns[key]));
                console.log("queryCondictionBasic: Engbun");
            }
        } else if (key === 'jitbun') {
            query.andWhere(function () {
                if ('JitBun' in dicColumns) {
                    this.orWhere(lowerQeury('JitBun'), '~*', lowerStr(columns[key]))
                }
                if ('KaisoehJitbunPoj' in dicColumns) {
                    this.orWhere(lowerQeury('KaisoehJitbunPoj'), '~*', lowerStr(columns[key]))
                }
                if ('LekuJitbunPoj' in dicColumns) {
                    this.orWhere(lowerQeury('LekuJitbunPoj'), '~*', lowerStr(columns[key]))
                }
            });
        } else if (key === 'hoabun') {
            if ('HoaBun' in dicColumns) {
                query.andWhere(lowerQeury('HoaBun'), '~*', lowerStr(columns[key]));
                console.log("queryCondictionBasic: HoaBun");
            }
        } else {
            query.andWhere(lowerQeury(key), '~*', lowerStr(columns[key]));
            console.log("queryCondictionBasic: else");
        }
    }
    return query;
}

function queryCondictionAllField(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name === dic);
    const columns = struct.columns;

    console.log("queryCondictionAllField: " + dic);

    const query = postgres.from(dic);
    for (key in columns) {
        if (key !== 'DictWordID'
            && key !== 'StoreLink') {
            query.orWhere(lowerQeury(key), '~*', lowerStr(options.value));
        }
    }
    return query;
}

function queryCondictionSingleDic(options) {
    const dic = options.dic;
    const struct = dicStruct.find(e => e.name === dic);
    const dicColumns = struct.columns;
    const columns = options.columns;

    console.log("queryCondictionSingleDic: " + dic);

    const query = postgres.from(dic);
    for (let key in columns) {
        if (key === 'DictWordID') {
            var keyNumber = columns[key].replace(/[^\d.-]/g, '');;
            query.andWhere(key, keyNumber);
        } else if (key in dicColumns) {
            if (key !== 'StoreLink') {
                query.andWhere(lowerQeury(key), '~*', lowerStr(columns[key]));
            }
        }
    }

    return query;
}
