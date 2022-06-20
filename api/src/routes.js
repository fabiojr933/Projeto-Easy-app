const express = require('express');
const route = express.Router();
const lancamentoController = require('./controller/LancamentoController');
const Middleware = require('./middleware/middleware');
const Autorizacao = require('./middleware/autorizacao');
const loginController = require('./controller/LoginController');
const usuarioController = require('./controller/usuarioController');
const despesaController = require('./controller/DespesaController');

const Lancamento = new lancamentoController();
const Login = new loginController();
const Usuario = new usuarioController();
const Despesa = new despesaController();

route.get('/lancamento/listaAll', Middleware.Autorizacao, Lancamento.listaAll);
route.get('/lancamento/lista/:id', Middleware.Autorizacao, Lancamento.listaId);
route.post('/lancamento/salvar', Middleware.Autorizacao, Lancamento.salvar);
route.delete('/lancamento/excluir', Middleware.Autorizacao, Lancamento.excluir);

route.post('/usuario/salvar', Usuario.salvar);
route.put('/usuario/alterar/:id', Middleware.Autorizacao, Usuario.alterar);

route.post('/login/autenticar', Login.autenticar);


route.get('/despesa/listaAll', Middleware.Autorizacao, Autorizacao.Autorizacao, Despesa.listaAll);
route.post('/despesa/salvar', Middleware.Autorizacao, Autorizacao.Autorizacao, Despesa.salvar);
route.put('/despesa/desativar/:id', Middleware.Autorizacao, Autorizacao.Autorizacao, Despesa.desativar);

module.exports = route;