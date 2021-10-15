const mongoose = require('mongoose');
const {Schema} = mongoose;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 100
    },
    correo:{
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        maxlength: 100
    },
    rol:{
        type: String,
        required: true,
        maxlength: 100,
        enum: ['Administrador','Gestor']
    },
    estado:{
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;