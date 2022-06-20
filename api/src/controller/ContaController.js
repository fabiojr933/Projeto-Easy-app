const Conta = require('../models/contaModel');

class ContaController {
    async listaAll(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const conta = new Conta();
            const dados = await conta.listaAll(id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {           
            const id_usuario = String(req.id_usuario);
            const conteudo = {
                'nome': String(req.body.nome),
                'conta': String(req.body.conta),
                'banco': String(req.body.banco),
                'status': 'Ativo',
                'id_usuario': id_usuario
            };            
            
            const cont = new Conta();
            const dados = await cont.salvar(conteudo);
            return res.status(200).json(dados);
        } catch (error) {          
            return res.status(400).json({ error: error.error });
           
        }
    }
    async desativar(req, res) {
        try {
            const id_usuario = String(req.id_usuario);
            const id = req.params.id;
            const conta = new Conta();
            const dados = await conta.desativar(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = ContaController;