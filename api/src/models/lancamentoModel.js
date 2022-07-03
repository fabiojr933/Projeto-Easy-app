const knex = require('../database/database');
const Validacao = require('../middleware/validacao');
const ofx = require('ofx-convertjs');
const fs = require('fs');
const path = require('path');

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


    async lancOFX(id_usuario, arquivo) {
        var nomeBanco = '';
        if (!id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        if (!arquivo) throw new Validacao('É obrigado enviar o arquivo');



        const file = fs.readFileSync(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', arquivo), 'utf8');
        const dados = ofx.toJson(file);
        //  console.log(dados.OFX.BANKMSGSRSV1.BANKTRANLIST);
        var numeroConta = Number(dados.OFX.BANKMSGSRSV1.BANKACCTFROM.ACCTID.replace('-', ''));
        var numeroBanco = parseInt(dados.OFX.BANKMSGSRSV1.BANKACCTFROM.BANKID);
        await knex('banco').count('id as id').where({ bankid: numeroBanco }).select('name').groupBy('name').then((resposta) => {
            nomeBanco = resposta[0].name.trim();
        });
        await knex('conta').count('id as id_conta').where({ conta: numeroConta }).then((resposta) => {
            //   console.log(resposta[0].id_conta);
            if (resposta[0].id_conta == 0 || resposta[0].id_conta == undefined) {
                knex('conta').insert({ 'nome': nomeBanco, 'conta': numeroConta, 'banco': numeroBanco, 'status': 'Ativo', 'id_usuario': id_usuario }).then((resposta) => {
                })
            }
        });
        var data = {
            'nomeBanco': nomeBanco,
            'numeroBanco': numeroBanco,
            'numeroConta': numeroConta,
            ...dados.OFX.BANKMSGSRSV1
        }

        return data;
    }
    async lancamento(dados) {
        console.log(dados)
        if (!dados.id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        await knex('lancamento').insert(dados).then((resposta) => {
        });
    }
    async lancamentoUpdate(id_receita, id_despesa, ofx_fitid, ofx_checknum, id_usuario) {
        if (!id_usuario) throw new Validacao('O usuario é obrigadorio informar');
        if (id_receita) {
            await knex('lancamento').update({ id_receita: id_receita, 'tipo': 'Entrada' }).where({ ofx_checknum: ofx_checknum, ofx_fitid: ofx_fitid, id_usuario: id_usuario });
        }
        if (id_despesa) {
            await knex('lancamento').update({ id_despesa: id_despesa, 'tipo': 'Saida' }).where({ ofx_checknum: ofx_checknum, ofx_fitid: ofx_fitid, id_usuario: id_usuario });
        }
    }
}
module.exports = lancamentoModel;
