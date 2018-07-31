
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('KauiokpooTaigiSutian', (table) => {
            table.integer('id').notNullable();
            table.string('poj_input').nullable();
            table.string('poj_unicode').nullable();
            table.string('poj_other_input').nullable();
            table.string('poj_other_unicode').nullable();
            table.string('tailo_input').nullable();
            table.string('tailo_unicode').nullable();
            table.string('tailo_other_input').nullable();
            table.string('tailo_other_unicode').nullable();
            table.string('word_property').nullable();
            table.string('word_bunpeh_property').nullable();
            table.string('word_other_property').nullable();
            table.string('taigi_hanji').nullable();
            table.string('hoagi').nullable();
            table.string('descriptions').nullable();
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('KauiokpooTaigiSutian'),
    ])
};
