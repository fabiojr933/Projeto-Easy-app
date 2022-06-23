const Despesa = require('../models/despesaModel');

class DespesaController {
    async listaAll(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const despesa = new Despesa();
            const dados = await despesa.listaAll(id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const despesa = {
                'despesa': String(req.body.despesa),
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new Despesa();
            const dados = await des.salvar(despesa);
            return res.status(201).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async desativar(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const id = req.params.id;
            const despesa = new Despesa();
            const dados = await despesa.desativar(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = DespesaController;