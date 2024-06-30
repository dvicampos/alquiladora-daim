const mongoose = require('mongoose');

const LonaSchema = new mongoose.Schema({
  tipoLona: {
    type: String,
    required: true
  },
  precioLona: {
    type: Number,
    required: true
  },
  stockLona: {
    type: Number,
    required: true
  }
});

const Lona = mongoose.model('Lona', LonaSchema);

module.exports = Lona;
