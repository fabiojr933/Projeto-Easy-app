const Despesa = require('../models/despesaModel');

class DespesaController {
    async listaAll(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const despesa = new Despesa();
            const dados = await despesa.listaAll(id_usuario);
            res.status(200).json(dados);
        } catch (error) {
            res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const despesa = {
                ...req.body,
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new Despesa();
            const dados = await des.salvar(despesa);
            res.status(200).json(dados);
        } catch (error) {
            res.status(400).json({ error: error.error });
        }
    }
    async desativar(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const id = req.params.id;
            const despesa = new Despesa();
            const dados = await despesa.desativar(id, id_usuario);
            res.status(200).json({ id });
        } catch (error) {
            res.status(400).json({ error: error.error });
        }
    }
}

module.exports = DespesaController;