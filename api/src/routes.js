const express = require('express');
const route = express.Router();
const multer = require('multer');
const multerConfig = require('./middleware/multerConfig');
const lancamentoController = require('./controller/LancamentoController');
const Middleware = require('./middleware/middleware');
const Autorizacao = require('./middleware/autorizacao');
const loginController = require('./controller/LoginController');
const usuarioController = require('./controller/usuarioController');
const despesaController = require('./controller/DespesaController');
const receitaController = require('./controller/ReceitaController')
const contaController = require('./controller/contaController');

const Lancamento = new lancamentoController();
const Login = new loginController();
const Usuario = new usuarioController();
const Despesa = new despesaController();
const Receita = new receitaController();
const Conta = new contaController();

route.post('/lancamento/LancSaida', Middleware.Autorizacao, Autorizacao.Autorizacao, Lancamento.LancSaida);
route.delete('/lancamento/LancSaidaExcluir/:id', Middleware.Autorizacao, Autorizacao.Autorizacao, Lancamento.LancSaidaExcluir);
route.post('/lancamento/LancEntrada', Middleware.Autorizacao, Autorizacao.Autorizacao, Lancamento.LancEntrada);
route.delete('/lancamento/LancEntradaExcluir/:id', Middleware.Autorizacao, Autorizacao.Autorizacao, Lancamento.LancEntradaExcluir);
route.post('/lancamento/lancOFX', Middleware.Autorizacao, Autorizacao.Autorizacao, multer(multerConfig).single('file'), Lancamento.lancOFX);

route.post('/usuario/salvar', Usuario.salvar);
route.put('/usuario/alterar/:id', Middleware.Autorizacao, Usuario.alterar);

route.post('/login/autenticar', Login.autenticar);


route.get('/despesa/listaAll', Middleware.Autorizacao, Autorizacao.Autorizacao, Despesa.listaAll);
route.post('/despesa/salvar', Middleware.Autorizacao, Autorizacao.Autorizacao, Despesa.salvar);
route.put('/despesa/desativar/:id', Middleware.Autorizacao, Autorizacao.Autorizacao, Despesa.desativar);


route.get('/receita/listaAll', Middleware.Autorizacao, Autorizacao.Autorizacao, Receita.listaAll);
route.post('/receita/salvar', Middleware.Autorizacao, Autorizacao.Autorizacao, Receita.salvar);
route.put('/receita/desativar/:id', Middleware.Autorizacao, Autorizacao.Autorizacao, Receita.desativar);


route.get('/conta/listaAll', Middleware.Autorizacao, Autorizacao.Autorizacao, Conta.listaAll);
route.post('/conta/salvar', Middleware.Autorizacao, Autorizacao.Autorizacao, Conta.salvar);
route.put('/conta/desativar/:id', Middleware.Autorizacao, Autorizacao.Autorizacao, Conta.desativar);




module.exports = route;