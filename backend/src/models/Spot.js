const mongoose = require('mongoose');


const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
})

//Criando um campo virtual para mandar a foto junto com o JSON do banco.
SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3030/files/${this.thumbnail}`
})

//Criando tabela no banco de dados
module.exports = mongoose.model('Spot', SpotSchema);