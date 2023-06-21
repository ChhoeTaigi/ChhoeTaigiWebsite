let DicStruct = require("../../api/dicts/dictionary-struct");

module.exports = {
  createTB: function(knex) {
    console.log("createTB 1");
    cmd = [];
    for (let idx in DicStruct) {
      const dicName = DicStruct[idx].name;
      const columns = DicStruct[idx].columns;
      delete columns.DictWordID;

      console.log("dicName: "+dicName);

      cmd.push(
        knex.schema.createTable(dicName, table => {
          table.string('DictWordID', 1024).notNullable();

          for (let key in columns) {
              table.string(key, 4096).nullable();
          }
        })
      );
    }
    Promise.all(cmd);
  }
};
