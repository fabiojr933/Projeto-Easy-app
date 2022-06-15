const express = require('express');
const route = express.Router();
const lancamentoController = require('./controller/LancamentoController');
const Middleware = require('./middleware/middleware');

const Lancamento = new lancamentoController();

/**
 * Route de lançamento de saida
 * listarAll => listar todas as saidas
 * listaId => lista um lancamento saida por Id
 * salvar => salvar uma saida
 * excluir => deletar uma saida 
 */
route.get('/lancamento/listaAll', Middleware.Autorizacao, Lancamento.listaAll);
route.get('/lancamento/lista/:id', Middleware.Autorizacao, Lancamento.listaId);
route.post('/lancamento/salvar', Middleware.Autorizacao, Lancamento.salvar);
route.delete('/lancamento/excluir', Middleware.Autorizacao, Lancamento.excluir);

module.exports = route;