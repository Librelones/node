                                     /*The index.js file is the entry point of the application.*/


/*Import dependencies that we need to use.*/

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

/*The most important of these is the const express = require('express'), which allows us to deal with routes, parameters and responses of our clients*/

const app = express();


/*We divide the server so that it supports http protocol, and the protocol that is websocket allows real-time communication*/

const server = require('http').Server(app);
const io = require('socket.io')(server);

/* Connection to the database */

mongoose.connect('mongodb+srv://librelon:marton2029@cluster0-qv9b1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
});

/*We allow and pass information from io to all routes, real-time information for frontend, access to .io within all controllers*/

app.use((req, res, next) => {
    req.io = io;
    next();
})

/*We use cors to allow all urls from different ips different servers, can access this backend*/
/*Without this here the react can not access the application*/

app.use(cors());

/*Route to access static files that are images that we uploaded.*/

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));     

/*Create a second separate route file to declare the routes of the application*/

app.use(require('./routes'));

server.listen(3000);
        
