const express = require('express');
const path = require('path');
const cors = require('cors');
const route = require('./routes');
const env = require('dotenv');
const bodyParser = require('body-parser');


env.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(express.json());
app.use('/api/v1', route);
route.use('/upload', express.static(path.resolve(__dirname, '...', 'public/upload')));
app.get('/api/v1/', (req, res) => { res.status(200).send('Home'); });
app.listen(port, () => { console.log(`Servidor ativo 🐱‍🏍 ✔ 🤓 na porta ${port}`); });