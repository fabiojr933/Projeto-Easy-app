
exports.up = (knex) => {
    return knex.schema.createTable('lancamento', (table) => {
        table.increments('id').primary();
        table.string('descricao');
        table.integer('id_usuario').references('id').inTable('usuario');
        table.integer('id_despesa').references('id').inTable('despesa');
        table.integer('id_receita').references('id').inTable('receita');
        table.integer('id_conta').references('id').inTable('conta');
        table.string('ofx_acctid'); 
        table.string('ofx_bankid');
        table.varchar('ofx_trntype'); 
        table.dateTime('ofx_dtposted'); 
        table.decimal('ofx_trnamt', 14, 2);   
        table.string('ofx_fitid');    
        table.string('ofx_checknum');    
        table.varchar('ofx_memo');    
        table.string('tipo');
        table.string('dia');
        table.string('mes');
        table.string('ano');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('lancamento');
};

