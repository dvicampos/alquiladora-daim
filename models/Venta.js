// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ventaSchema = new Schema({
//     producto: { type: String, enum: ['Inflable', 'Lona'] },
//     cantidad: Number,
//     nombre: String,
//     telefono: String,
//     domicilio: String,
//     fecha_entrega: Date,
//     total: Number
// });

// module.exports = mongoose.model('Venta', ventaSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    productos: [{
        tipo: String,
        categoria: String,
        cantidad: Number,
        precio: Number
    }],
    nombre: String,
    telefono: String,
    // email: String,
    domicilio: String,
    fecha_entrega: Date,
    fecha_fin: Date,
    total: Number
});

module.exports = mongoose.model('Venta', ventaSchema);
