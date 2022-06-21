const Usuario = require('../models/UsuarioModel');
class UsuarioController {
    async salvar(req, res) {
        try {
            let usuario = req.body;
            let user = new Usuario();
            await user.salvar(usuario);
            return res.status(201).json({
                ...usuario
            });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async alterar(req, res) {
        try {
            let usuario = req.body;
            let id = req.params.id;
            let user = new Usuario();
            await user.alterar(usuario, id);
            return res.status(200).json({
                sucesso: 'Dados dos usuario alterado com sucesso'
            });
        } catch (error) {
            
        }
    }
}

module.exports = UsuarioController;