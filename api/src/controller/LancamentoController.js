const Lancamento = require('../models/lancamentoModel');

class LancamentoController {

    async LancSaida(req, res) {
        try {        
            const id_usuario = req.id_usuario;
            const valor = parseFloat(req.body.trnamt); // valor
            const id_despesa = Number(req.body.id_despesa);
            const id_conta = Number(req.body.id_conta);
            const descricao = req.body.descricao;
            const despesa = {
                'id_usuario': id_usuario,
                'ofx_trnamt': valor,
                'id_despesa': id_despesa,
                'id_conta': id_conta,
                'descricao': descricao,
                'ofx_trntype': 'DEBIT',
                'tipo': 'Manual'
            }
            const lancamento = new Lancamento();
            const dados = await lancamento.LancSaida(despesa);
            res.status(201).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async LancSaidaExcluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            console.log(id, id_usuario)
            const lancamento = new Lancamento();
            await lancamento.LancSaidaExcluir(id, id_usuario);
            res.status(200).json({'id': id});
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }


    async LancEntrada(req, res) {
        try {        
            const id_usuario = req.id_usuario;
            const valor = parseFloat(req.body.trnamt); // valor
            const id_receita = Number(req.body.id_receita);
            const id_conta = Number(req.body.id_conta);
            const descricao = req.body.descricao;
            const despesa = {
                'id_usuario': id_usuario,
                'ofx_trnamt': valor,
                'id_receita': id_receita,
                'id_conta': id_conta,
                'descricao': descricao,
                'ofx_trntype': 'CREDIT',
                'tipo': 'Manual'
            }
            const lancamento = new Lancamento();
            const dados = await lancamento.LancEntrada(despesa);
            res.status(201).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async LancEntradaExcluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            console.log(id, id_usuario)
            const lancamento = new Lancamento();
            await lancamento.LancEntradaExcluir(id, id_usuario);
            res.status(200).json({'id': id});
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }


    async lancOFX(req, res){
        try {
            res.status(200).send('pronto');
        } catch (error) {
            
        }
    }

}
module.exports = LancamentoController;