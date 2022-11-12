const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enteSchema = new Schema({
    id: Number,
    siglas: String,
    descripcion: String
});

// crear modelo
const Ente = mongoose.model('Ente', enteSchema);

module.exports = Ente;