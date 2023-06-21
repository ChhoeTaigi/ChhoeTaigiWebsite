import queryString from 'query-string';

import dicStruct from '../dicts/dictionary-struct';

export const stringify = (options) => {
    let query = {
        method: options.method,
    };

    if (options.method === 'basic') {
        if (options.dic)
            query.dic = options.dic;

        if (options.page)
            query.page = options.page;

        if (options.searchMethod)
            query.searchMethod = options.searchMethod;

        if (options.spellingMethod)
            query.spellingMethod = options.spellingMethod;

        const columns = options.columns;
        if (columns.spelling)
            query.spelling = columns.spelling;

        if (columns.taibun)
            query.taibun = columns.taibun;

        if (columns.hoabun)
            query.hoabun = columns.hoabun;

        if (columns.english)
            query.english = columns.english;

        if (columns.jitbun)
            query.jitbun = columns.jitbun;
    } else if (options.method === 'all-field') {
        if (options.dic)
            query.dic = options.dic;

        if (options.page)
            query.page = options.page;

        if (options.searchMethod)
            query.searchMethod = options.searchMethod;

        if (options.value)
            query.value = options.value;
    } else if (options.method === 'single-dic') {
        if (options.dic)
            query.dic = options.dic;

        if (options.page)
            query.page = options.page;

        if (options.searchMethod)
            query.searchMethod = options.searchMethod;

        const columns = options.columns;
        if (columns) {
            const struct = dicStruct.find(e => e.name === options.dic)
            const structColumns = struct.columns;
            for (let key in columns) {
                if (key in structColumns) {
                    query[key] = columns[key];
                }
            }
        }
    }

    return queryString.stringify(query);

}

export const parse = (search) => {
    const query = queryString.parse(search);

    let options = {};
    if (query.method === 'basic') {
        // parse old query strings
        switch (query.spellingMethod) {
            case "poj_unicode":
                query.spellingMethod = "PojUnicode";
                break;
            case "poj_input":
                query.spellingMethod = "PojInput";
                break;
            case "kiplmj_unicode":
                query.spellingMethod = "KipUnicode";
                break;
            case "kiplmj_input":
                query.spellingMethod = "KipInput";
                break;
        }

        options = {
            method: query.method,
            dic: query.dic,
            page: query.page,
            searchMethod: query.searchMethod,
            spellingMethod: query.spellingMethod,
            columns: {
                spelling: query.spelling,
                taibun: query.taibun,
                hoabun: query.hoabun,
                english: query.english,
                jitbun: query.jitbun,
            },
        };
    } else if (query.method === 'all-field') {
        options = {
            method: query.method,
            dic: query.dic,
            page: query.page,
            searchMethod: query.searchMethod,
            value: query.value,
        }
    } else if (query.method === 'single-dic') {
        const dic = query.dic;
        const struct = dicStruct.find(e => e.name === dic)
        const structColumns = struct.columns;
        const columns = {}
        for (let key in query) {
            if (key in structColumns) {
                columns[key] = query[key];
            }
        }
        options = {
            method: query.method,
            dic: dic,
            page: query.page,
            searchMethod: query.searchMethod,
            columns: columns,
        }
    }

    return options;
}