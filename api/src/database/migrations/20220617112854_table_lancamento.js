
exports.up = (knex) => {
    return knex.schema.createTable('lancamento', (table) => {
        table.increments('id').primary();
        table.string('DESCRICAO');
        table.integer('id_usuario').references('id').inTable('usuario');
        table.integer('id_despesa').references('id').inTable('despesa');
        table.integer('id_receita').references('id').inTable('receita');
        table.integer('id_conta').references('id').inTable('conta');
        table.integer('ofx_acctid'); 
        table.integer('ofx_bankid');
        table.varchar('ofx_trntype'); 
        table.dateTime('ofx_dtposted'); 
        table.decimal('ofx_trnamt', 14, 2);   
        table.integer('ofx_fitid');    
        table.integer('ofx_checknum');    
        table.varchar('ofx_memo');    
        table.decimal('OFX_LEDGEofx_ledgerbalRBAL', 14, 2);   
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('lancamento');
};

