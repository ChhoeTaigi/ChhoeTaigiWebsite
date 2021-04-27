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
            if (// TaijitToaSutian
                key === "hanlo_taibun_kaisoeh_poj" ||
                key === "hanlo_taibun_kaisoeh_kip" ||
                key === "hanlo_taibun_leku_poj" ||
                key === "hanlo_taibun_leku_kip" ||
                // TaioanPehoeKichhooGiku
                key === "english" ||
                key === "english_soatbeng" ||
                key === "example_su" ||
                key === "example_ku_taibun_poj" ||
                key === "example_ku_english" ||
                key === "example_ku_hoabun" ||
                // EmbreeTaiengSutian, MaryknollTaiengSutian
                key === "english" ||
                // KauiokpooTaigiSutian
                key === "descriptions_poj" ||
                key === "descriptions_kip" ||
                key === "dialects_kip" ||
                // BanglooMuitheSekinSutian
                key === "poj_unicode" ||
                key === "poj_input" ||
                key === "kip_unicode" ||
                key === "kip_input" ||
                key === "hanlo_taibun_poj" ||
                key === "hanlo_taibun_kip" ||
                key === "hoabun" ||
                key === "english" ||
                key === "poochhiong_chuliau")
              table.string(key, 2048).nullable();
            else {
              table.string(key).nullable();
            }
          }
        })
      );
    }
    Promise.all(cmd)
  }
};
