/* O arquivo index.js é o ponto de entrada da aplicação.*/

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

/*Aqui realizamos a importação das dependencias que precisamos utilizar. 
A mais importante delas é a express, que permite lidarmos com rotas, parametros e respostas de nossos clientes
*/

const app = express();

/* Dividimos o servidor para que suporte protocolo http, e o protocolo websocket que é  permite a comunicação em tempo real
*/
const server = require('http').Server(app);
const io = require('socket.io')(server);

/* Realizamos a conexao com o banco de dados */

mongoose.connect('mongodb+srv://librelon:marton2029@cluster0-qv9b1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
});

/* Permitimos e repassamos a informação do io para todas as rotas, informações em tempo real para frontend, acesso ao .io dentro de todos os controllers*/

app.use((req, res, next) => {
    req.io = io;
    next();
})

/*Utilizamos o cors para permitir que todas as urls de diferente ips diferentes servidores, possam acessar esse backend
Sem isso aqui o react não consegue acessar a aplicação */

app.use(cors());

/*Rota para acessar arquivos estaticos que são imagens que fizemos uploads.*/

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));     

/*Cria-se um segundo arquivo separado de rotas para declarar as rotas da aplicação*/

app.use(require('./routes'));

server.listen(3000);



        