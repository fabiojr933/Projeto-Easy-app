const knex = require('../database/database');
const Validacao = require('../middleware/validacao');

class receitaModel {
    async listaAll(id_usuario) {
        var receita = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('receita').where({ id_usuario: id_usuario, 'status': 'Ativo' }).then((resposta) => {
            receita = resposta;
        });
        return receita;
    }
    async salvar(receita) {
        var dados = {};
        var ExisteReceita = 0;
        if (!receita.receita) throw new Validacao('O nome da receita é obrigatorio')
        if (!receita.id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex.raw(`select 
                            count(id)as id
                            from receita a
                            where id_usuario = ${receita.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.receita) = LOWER('${receita.receita}') `).then((resposta) => {
            ExisteReceita = Number(resposta.rows[0].id);
        });
        if (ExisteReceita > 0) {
            throw new Validacao('Essa Receita ja esta cadastrado');
        }
        await knex('receita').insert(receita).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...receita
            }
        });
        return dados;
    }
    async desativar(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('receita').update({ 'status': 'Desativado' }).where({ id: id, id_usuario: id_usuario }).then((resposta) => {
        });
    }
}

module.exports = receitaModel;