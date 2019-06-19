const express = require('express');
const mongoose = require ('mongoose');

const app = express();

mongoose.connect('mongodb+srv://librelon:marton2029@cluster0-qv9b1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
});

app.use(require('./routes'));

app.listen(3000);


