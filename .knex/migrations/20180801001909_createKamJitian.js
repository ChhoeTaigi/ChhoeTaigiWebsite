
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('KamJitian', (table) => {
            table.integer('id').notNullable();
            table.string('poj_input').nullable();
            table.string('poj_unicode').nullable();
            table.string('tailo_input').nullable();
            table.string('tailo_unicode').nullable();
            table.string('taigi_hanlo_poj').nullable();
            table.string('taigi_hanlo_tailo').nullable();
            table.string('taigi_kaisoeh_poj').nullable();
            table.string('taigi_kaisoeh_tailo').nullable();
            table.string('taigi_kaisoeh_hanlo_poj').nullable();
            table.string('page_number').nullable();
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('KamJitian'),
    ])
};
