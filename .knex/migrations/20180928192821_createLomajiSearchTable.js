let searchDicStruct = require('../../imports/api/search_dictionary_struct');

exports.up = function(knex, Promise) {
    cmd = [];
    for (let idx in searchDicStruct) {
        const dicName = searchDicStruct[idx].dbname;
        const columns = searchDicStruct[idx].columns;
        cmd.push(
            knex.schema.createTable(dicName, (table) => {
                table.integer('main_id').notNullable();
                for (let idx in columns) {
                    const column = columns[idx];
                    if (column !== 'main_id') {
                        table.string(column).nullable();
                    }
                }
            })
        );
    }
    
    return Promise.all(cmd);
};

exports.down = function(knex, Promise) {
    cmd = [];
    for (let idx in searchDicStruct) {
        let dicName = searchDicStruct[idx].dbname;
        cmd.push(
            knex.schema.dropTable(dicName)
        )
    }

    return Promise.all(cmd);
};
