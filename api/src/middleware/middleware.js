const env = require('dotenv');
env.config();

exports.Autorizacao = async (req, res, next) => {
    const Token = req.header('Authorization')?.replace('Bearer ', '');
    if (!Token || Token == '' || Token == undefined) {
        return res.status(401).json({
            status: '401',
            resultado: 'falha',
            erro: 'Token é obrigatorio!'
        });
    }
    try {
        if (process.env.TOKEN != Token) {
            console.log(process.env.TOKEN)
            console.log(Token)
            return res.status(401).json({
                status: '401',
                resultado: 'falha',
                erro: 'Token informado esta invalido!'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            'resultado': 401,
            'status': 'falha',
            'error': 'Aconteceu algum erro ao validar o Token'
        });
    }
}
