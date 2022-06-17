exports.up = (knex) => {
    return knex.schema.createTable('conta', (table) => {
        table.increments('id').primary();
        table.string('conta').notNull();
        table.string('status').notNull();
        table.integer('id_usuario').references('id').inTable('usuario').notNull();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('despesa');
};
