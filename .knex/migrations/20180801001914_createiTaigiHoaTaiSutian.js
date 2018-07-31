
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('iTaigiHoaTaiSutian', (table) => {
            table.integer('id').notNullable();
            table.string('poj_input').nullable();
            table.string('poj_unicode').nullable();
            table.string('tailo_input').nullable();
            table.string('tailo_unicode').nullable();
            table.string('hanlo').nullable();
            table.string('hoagi').nullable();
            table.string('from').nullable();
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('iTaigiHoaTaiSutian'),
    ])
};
