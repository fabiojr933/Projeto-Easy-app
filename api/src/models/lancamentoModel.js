const knex = require('../database/database');
const Validacao = require('../middleware/validacao');

class lancamentoModel {
    async LancSaida(dados) {
        var lista = {};
        console.log(dados)
        if (!dados.ofx_trnamt) throw new Validacao('O valor é obrigadorio informar');
        if (!dados.id_despesa) throw new Validacao('O despesa é obrigadorio informar');
        if (!dados.id_conta) throw new Validacao('A conta é obrigadorio informar');
        if (!dados.id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        await knex('lancamento').insert(dados).returning('id').then((resposta) => {
            lista = {
                'id': Number(resposta[0].id),
                ...dados
            }
        });
        return lista;
    }
    async LancSaidaExcluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        if (!id) throw new Validacao('É obrigado informar um lancamento para excluir');
        await knex('lancamento').delete().where({ 'id': id, 'id_usuario': id_usuario }).then((resposta) => {
        });
    }




    async LancEntrada(dados) {
        var lista = {};
        console.log(dados)
        if (!dados.ofx_trnamt) throw new Validacao('O valor é obrigadorio informar');
        if (!dados.id_receita) throw new Validacao('A receita é obrigadorio informar');
        if (!dados.id_conta) throw new Validacao('A conta é obrigadorio informar');
        if (!dados.id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        await knex('lancamento').insert(dados).returning('id').then((resposta) => {
            lista = {
                'id': Number(resposta[0].id),
                ...dados
            }
        });
        return lista;
    }
    async LancEntradaExcluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        if (!id) throw new Validacao('É obrigado informar um lancamento para excluir');
        await knex('lancamento').delete().where({ 'id': id, 'id_usuario': id_usuario }).then((resposta) => {
        });
    }


    async lancOFX(arquivo){
        try {
            res.status(200).send('pronto');
        } catch (error) {
            
        }
    }

}
module.exports = lancamentoModel;
