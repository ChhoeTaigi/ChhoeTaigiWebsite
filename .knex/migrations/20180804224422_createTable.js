let DicStruct = require('../../imports/api/dictionary_struct');

exports.up = function(knex, Promise) {
    cmd = [];
    for (let idx in DicStruct) {
        let dicName = DicStruct[idx].name;
        let columns = DicStruct[idx].columns;
        delete columns.id;
        cmd.push(
            knex.schema.createTable(dicName, (table) => {
                table.integer('id').notNullable();
                for (let key in columns) {
                    if (key === 'english_descriptions')
                        table.string(key, 511).nullable();
                    else if (key === 'descriptions' || key === 'hanlo_taibun_kaisoeh_poj' || key === 'hanlo_taibun_kaisoeh_kiplmj' || key === 'hanlo_taibun_leku_poj' || key === 'hanlo_taibun_leku_kiplmj')
                        table.string(key, 1023).nullable();
                    else
                        table.string(key).nullable();
                }
            })
        );
    }
    
    return Promise.all(cmd);
};

exports.down = function(knex, Promise) {
    cmd = [];
    for (let idx in DicStruct) {
        let dicName = DicStruct[idx].name;
        cmd.push(
            knex.schema.dropTable(dicName)
        )
    }

    return Promise.all(cmd);
};
