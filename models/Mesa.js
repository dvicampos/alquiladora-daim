const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
  tipoMesa: {
    type: String,
    required: true
  },
  precioMesa: {
    type: Number,
    required: true
  },
  stockMesa: {
    type: Number,
    required: true
  }
});

const Mesa = mongoose.model('Mesa', MesaSchema);

module.exports = Mesa;
