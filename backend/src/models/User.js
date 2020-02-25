const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: String,
})

//Criando tabela no banco de dados
module.exports = mongoose.model('User', UserSchema);