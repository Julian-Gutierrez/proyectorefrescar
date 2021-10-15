const mongoose = require('mongoose');
const {Schema} = mongoose;

const categoriaSchema = new Schema({
    nombre: {
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

const Categoria = mongoose.model('categoria', categoriaSchema);

module.exports = Categoria;