const Receita = require('../models/receitaModel');

class ReceitaController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const receita = new Receita();
            const dados = await receita.listaAll(id_usuario);
            return res.status(201).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error })
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const receita = {
                'receita': String(req.body.receita),
                'status': 'Ativo',
                'id_usuario': id_usuario
            }
            const rec = new Receita();
            const dados = await rec.salvar(receita);
            return res.status(200).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error })
        }
    }
    async desativar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const receira = new Receita();
            const dados = await receira.desativar(id, id_usuario);
            res.status(200).json({ 'id': id });
        } catch (error) {
            return res.status(400).json({ error: error.error })
        }
    }
}

module.exports = ReceitaController;