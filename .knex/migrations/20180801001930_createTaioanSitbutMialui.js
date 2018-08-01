
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('TaioanSitbutMialui', (table) => {
            table.integer('id').notNullable();
            table.string('poj_input').nullable();
            table.string('poj_unicode').nullable();
            table.string('tailo_input').nullable();
            table.string('tailo_unicode').nullable();
            table.string('taigi_hanji').nullable();
            table.string('page_number').nullable();
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('TaioanSitbutMialui'),
    ])
};
