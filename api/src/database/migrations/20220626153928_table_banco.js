
exports.up = function (knex) {
    return knex.schema.createTable('banco', (table) => {
        table.increments('id').primary();
        table.integer('bankid').notNull();
        table.string('name').notNull();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('banco');
};
