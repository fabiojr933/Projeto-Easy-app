exports.up = (knex) => {
    return knex.schema.createTable('despesa', (table) => {
        table.increments('id').primary();
        table.string('despesa').notNull();
        table.string('status').notNull();
        table.integer('id_usuario').references('id').inTable('usuario').notNull();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('despesa');
};
