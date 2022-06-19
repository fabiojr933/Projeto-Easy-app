const knex = require('../database/database');
const Validacao = require('../middleware/validacao');

class contaModel {
    async listaAll(id_usuario) {
        var conta = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('conta').where({ 'id_usuario': id_usuario, 'status': 'Ativo' }).select('*').then((resposta) => {
            conta = resposta;
        })
        return conta;
    }
    async salvar(conta) {
        var dados = {};
        var ExisteConta = 0;
        if (!conta.conta) throw new Validacao('É obrigado informar uma conta bancaria');
        if (!conta.banco) throw new Validacao('É obrigatorio informar o codigo do banco');
        if (!conta.id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex.raw(`select 
                            count(id)as id
                            from conta a
                            where id_usuario = ${conta.id_usuario}    
                            and status = 'Ativo'                   
                            and a.conta = '${conta.conta}'`).then((resposta) => {
            ExisteConta = Number(resposta.rows[0].id);
        })
        if (ExisteConta > 0) {
            throw new Validacao('Essa Conta bancaria ja esta cadastrado');
        }
        await knex('conta').insert(conta).returning('id').then((resposta) => {
            dados = {
                'id': Number(resposta[0].id),
                ...conta
            }
        });
        return dados;
    }
    async desativar(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        console.log(id_usuario, id)
        await knex('conta').update({ status: 'Desativado' }).where({ id: id, id_usuario: id_usuario }).then((resposta) => {
            console.log(resposta);
        });
    }
}

module.exports = contaModel;