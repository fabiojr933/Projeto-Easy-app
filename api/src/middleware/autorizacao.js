const env = require('dotenv');
const knex = require('../database/database');
env.config();

exports.Autorizacao = async (req, res, next) => {
    const autorizacao = req.header('autorizacao');
    if (!autorizacao || autorizacao == '' || autorizacao == undefined) {
        return res.status(401).json({
            status: '401',
            resultado: 'falha',
            erro: 'Autorização é obrigatorio!'
        });
    }
    try {
        await knex('usuario').where({ token: autorizacao }).select('*').then((resposta) => {
            if (resposta[0].id) {       
                req.id_usuario = resposta[0].id;         
                next();
            }else{
                return res.status(401).json({
                    status: '401',
                    resultado: 'falha',
                    erro: 'Autorização invalida!'
                });
            }
        });
    } catch (error) {
        return res.status(401).json({
            status: '401',
            resultado: 'falha',
            erro: 'Autorização invalida!'
        });;
    }
}
