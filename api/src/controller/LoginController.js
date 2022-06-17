const Login = require('../models/LoginModel');
class LoginController {
    async autenticar(req, res) {
        try {
            let usuario = req.body;
            let login = new Login();
            const autenticacao = await login.Autenticar(usuario);
        } catch (error) {
            res.status(400).json({ error: error.smg });
        }
    }
    async logoff(req, res) {

    }
}

module.exports = LoginController;