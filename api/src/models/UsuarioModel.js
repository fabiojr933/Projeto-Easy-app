var jwt = require('jwt-simple');
const env = require('dotenv');
const knex = require('../database/database');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const Validacao = require('../middleware/validacao');
env.config();

class UsuarioModel {
    async salvar(usuario) {
        if (!usuario.senha) throw new Validacao("Senha é obrigatorio");
        if (!usuario.email) throw new Validacao("Email é obrigatorio");
        if (!usuario.nome) throw new Validacao("Nome do usuario é obrigatorio");
        var token = jwt.encode(usuario.email, process.env.SEGREDO)
        var salto = bcrypt.genSaltSync(10);
        usuario.senha = bcrypt.hashSync(usuario.senha, salto);
        var dados = {
            ...usuario,
            'token': token,
            'data': moment().format('YYYY.MM.DD')
        };

        await knex('usuario').count('email as email').where({ email: dados.email }).then((resposta) => {
            if (resposta[0].email > 0) {
                throw new Validacao('Esse email já esta cadastrado');
            }
            knex('usuario').insert(dados).returning('id').then((ultimoId) => {
                knex('receita').insert([
                    { receita: 'Outros', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { receita: 'Beneficios', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { receita: 'Comissão', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { receita: 'Pagamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { receita: 'Rendimentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { receita: 'Serviços', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { receita: 'Vendas', status: 'Ativo', id_usuario: ultimoId[0].id },
                ]).then((receita) => {
                    knex('despesa').insert([
                        { despesa: 'Alimentação', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Carro', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Educação', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Familia', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Moradia', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Pagamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Saúde', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Serviços', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Transporte', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Vestuario', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Viagens', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Taxas', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Tazer', status: 'Ativo', id_usuario: ultimoId[0].id },
                        { despesa: 'Assinaturas', status: 'Ativo', id_usuario: ultimoId[0].id },
                    ]).then((despesa) => {
                        knex('conta').insert([
                            {nome: 'Carteira', conta: 898999, banco: 748, status: 'Ativo', id_usuario: ultimoId[0].id },
                        ]).then((despesa) => {
                        });
                    });
                });
            });
        });
    }

    async alterar(usuario, id) {
        if (!id) throw new Validacao("É obrigado informar o usuario");
        if (!usuario.senha) throw new Validacao("Alterar qualquer dados do cadatro, a senha é obrigatorio alterar tambem");
        var salto = bcrypt.genSaltSync(10);
        usuario.senha = bcrypt.hashSync(usuario.senha, salto);
        var dados = {
            ...usuario,
        };
        await knex('usuario').count('id as id').where({ id: id }).then((resposta) => {
            if (!resposta[0].id == 1) {
                throw new Validacao('Esse email não existe');
            }
            knex('usuario').update(dados).where({ id: id }).then((usuario) => {
            }).catch(error => {               
            });
        }).catch(error => {           
        });
    }
}
module.exports = UsuarioModel;


