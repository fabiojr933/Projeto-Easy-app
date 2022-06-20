const knex = require('../database/database');
const Validacao = require('../middleware/validacao');

class despesaModel {
    async listaAll(id_usuario) {
        var despesas = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('despesa').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            despesas = resposta;
        })
        return despesas;
    }
    async salvar(despesa) {
        var dados = {};
        var ExisteDespesa = 0;
        if (!despesa.despesa) throw new Validacao('O nome da despesa é obrigatorio');
        if (!despesa.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from despesa a
                            where id_usuario = ${despesa.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.despesa) = LOWER('${despesa.despesa}') `).then((resposta) => {
            ExisteDespesa = Number(resposta.rows[0].id);   
        })
        if (ExisteDespesa > 0) {
            throw new Validacao('Essa Despesa ja esta cadastrado');
        }
        await knex('despesa').insert(despesa).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...despesa
            }
        });
        return dados;
    }
    async desativar(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('despesa').update({ 'status': 'Desativado' }).where({ id: id, id_usuario: id_usuario }).then((resposta) => {
        });
    }
}

module.exports = despesaModel;