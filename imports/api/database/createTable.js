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
          table.integer('DictWordID').notNullable();

          for (let key in columns) {
            // if (// TaijitToaSutian
            //     key === "KaisoehHanLoPoj" ||
            //     key === "KaisoehHanLoKip" ||
            //     key === "LekuHanLoPoj" ||
            //     key === "LekuHanLoKip" ||
            //     key === "GoanchhehPoochhiongChuliau" ||
            //     // TaioanPehoeKichhooGiku
            //     key === "EngBun" ||
            //     key === "KaisoehEngbun" ||
            //     key === "LesuPoj" ||
            //     key === "LekuPoj" ||
            //     key === "LekuEngbun" ||
            //     key === "LekuHoabun" ||
            //     // EmbreeTaiengSutian, MaryknollTaiengSutian
            //     key === "EngBun" ||
            //     // KauiokpooTaigiSutian
            //     key === "KaisoehPoj" ||
            //     key === "KaisoehKip" ||
            //     key === "KipDictDialects" ||
            //     // BanglooMuitheSekinSutian
            //     key === "PojUnicode" ||
            //     key === "PojInput" ||
            //     key === "KipUnicode" ||
            //     key === "KipInput" ||
            //     key === "HanLoTaibunPoj" ||
            //     key === "HanLoTaibunKip" ||
            //     key === "HoaBun" ||
            //     key === "EngBun" ||
            //     key === "SoanntengMuitheSekinPoochhiongChuliau")
              table.string(key, 2048).nullable();
            // else {
            //   table.string(key).nullable();
            // }
          }
        })
      );
    }
    Promise.all(cmd);
  }
};
