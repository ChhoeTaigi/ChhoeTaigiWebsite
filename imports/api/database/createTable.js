let DicStruct = require("../../api/dicts/dictionary-struct");

module.exports = {
  createTB: function(knex) {
    cmd = [];
    for (let idx in DicStruct) {
        
      const dicName = DicStruct[idx].name;
      const columns = DicStruct[idx].columns;
      delete columns.id;
      cmd.push(
        knex.schema.createTable(dicName, table => {
          table.integer("id").notNullable();
          for (let key in columns) {
            if (key === "english_descriptions")
              table.string(key, 511).nullable();
            else if (
              key === "descriptions" ||
              key === "hanlo_taibun_kaisoeh_poj" ||
              key === "hanlo_taibun_kaisoeh_kiplmj" ||
              key === "hanlo_taibun_leku_poj" ||
              key === "hanlo_taibun_leku_kiplmj"
            )
              table.string(key, 1023).nullable();
            else table.string(key).nullable();
          }
        })
      );
    }
    Promise.all(cmd)
  }
};
