class LancamentoController {
    async listaAll(req, res) {
        try {
            res.status(200).send('rota de listar todos as saidas');

        } catch (error) {

        }
    }
    async listaId(req, res) {
        try {
            res.status(200).send('rota de listar uma saida por id');
        } catch (error) {
            
        } 
    }
    async salvar(req, res) {
        try {
            res.status(200).send('rota de salvar uma saida');
        } catch (error) {
            
        }
    }
    async excluir(req, res) {
        try {
            res.status(200).send('rota de excluir uma saida');
        } catch (error) {
            
        }
    }
}
module.exports = LancamentoController;