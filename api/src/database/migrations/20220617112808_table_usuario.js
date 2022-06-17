
exports.up = (knex) => {
    return knex.schema.createTable('usuario', (table) => {
        table.increments('id').primary();
        table.string('nome').notNull();
        table.string('email').notNull();     
        table.string('senha').notNull();
        table.string('token').notNull();
        table.date('data');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('usuario');
};

