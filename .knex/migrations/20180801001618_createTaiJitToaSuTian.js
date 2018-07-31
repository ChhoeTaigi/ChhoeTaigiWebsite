
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('TaiJitToaSuTian', (table) => {
            table.integer('id').notNullable();
            table.string('poj_input').nullable();
            table.string('poj_other_input').nullable();
            table.string('poj_unicode').nullable();
            table.string('poj_other_unicode').nullable();
            table.string('tailo_input').nullable();
            table.string('tailo_other_input').nullable();
            table.string('tailo_unicode').nullable();
            table.string('tailo_other_unicode').nullable();
            table.string('hanlo_poj').nullable();
            table.string('hanlo_tailo').nullable();
            table.string('taigi_kaisoeh_hanlo_poj').nullable();
            table.string('taigi_kaisoeh_hanlo_tailo').nullable();
            table.string('taigi_leku_hanlo_poj').nullable();
            table.string('taigi_leku_hanlo_tailo').nullable();
            table.integer('page_number').nullable();
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('TaiJitToaSuTian'),
    ])
};
