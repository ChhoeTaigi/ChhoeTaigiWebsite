
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('EmbreeTaigiSuTian', (table) => {
            table.integer('id').notNullable();
            table.string('poj_input').nullable();
            table.string('poj_unicode').nullable();
            table.string('tailo_input').nullable();
            table.string('tailo_unicode').nullable();
            table.string('hoagi').nullable();
            table.string('abbreviations').nullable();
            table.string('noun_classifiers').nullable();
            table.string('reduplication').nullable();
            table.string('english_descriptions', 511).nullable();
            table.string('page_number').nullable();
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('EmbreeTaigiSuTian'),
    ])
};
