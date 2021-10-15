const mongoose = require('mongoose');
const {Schema} = mongoose;

const articuloSchema = new Schema({
    categoria:{
        type: Schema.ObjectId, ref:'categoria' 
    },
    nombre: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    codigo: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    descripcion:{
        type: String,
        required: true,
        maxlength: 255,
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

const Articulo = mongoose.model('articulo', articuloSchema);

module.exports = Articulo;