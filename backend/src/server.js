const express = require('express');
//Liberando as rotas para o resto da aplicação
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//Para ouvir protocolo websocket
//Criação de comunicação ponta a ponta entre servidor e client
const socketio = require('socket.io');
const http = require('http');

const app = express();
//Extraindo servidor http do express
const server = http.Server(app);
//Server passa a também ouvir protocolo websocket
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hv4xm.mongodb.net/week9?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {};

//Anotando informações de todos os usuarios logados
io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuario Conectado', socket.id);

    const { user_id } = socket.handshake.query;

    //Relacionando id de usuario que vem do front end com o id do socket de conexao do mesmo usuario
    connectedUsers[user_id] = socket.id;

    //Enviando informações para o client;
    //socket.emit('hello', 'World');

    //Recebendo informações do client;
    socket.on('omni', data => {
        console.log(data);
    })
});
//Adicionando uma funcionalidade em toda rota
app.use((req, res, next) => {
    //protocolo de comunicação com o front-end e mobile em tempo real
    req.io = io;
    //Dando acesso a todas as rotas os usuarios conectados na minha aplicação
    req.connectedUsers = connectedUsers;

    //Continuando o fluxo da aplicação
    return next();
})

// GET , POST, PUT , DELETE

// req.query = Acessar query params (para filtros (GET))
// req.params = Acessar route params (Para edição , delete (PUT / DELETE))
// req.body = Acessar body params (Para criação / edição (POST))

//Faz com que qualquer aplicação possa acessar a API
app.use(cors());
// Faz o express entender json
app.use(express.json()); 

//Pegando a foto da pasta uploads.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3030);