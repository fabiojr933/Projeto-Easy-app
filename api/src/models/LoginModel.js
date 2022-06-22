const Validacao = require('../middleware/validacao');
const knex = require('../database/database');
const bcrypt = require('bcryptjs');

class LoginModel {
    async Autenticar(usuario) {
        var dados = {};       
        if (!usuario.email) throw new Validacao('Email é obrigatorio');
        if (!usuario.senha) throw new Validacao('A senha é obrigatorio');
        await knex('usuario').where({ email: usuario.email }).first().then((resposta) => {           
            if (resposta.email === undefined) {
                throw new Validacao('Email não encontrado');
            }
            if (bcrypt.compareSync(usuario.senha, resposta.senha)) {
                dados = {
                    id: resposta.id,
                    email: resposta.email,
                    autorizacao: resposta.token
                }               
            } else {
                throw new Validacao('Senha invalida');
            }
        });
        return dados;
    }
}
module.exports = LoginModel;