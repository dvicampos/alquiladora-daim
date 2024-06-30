const mongoose = require('mongoose');

const ManteleriaSchema = new mongoose.Schema({
  tipoManteleria: {
    type: String,
    required: true
  },
  precioManteleria: {
    type: Number,
    required: true
  },
  stockManteleria: {
    type: Number,
    required: true
  }
});

const Manteleria = mongoose.model('Manteleria', ManteleriaSchema);

module.exports = Manteleria;
