const mongoose = require('mongoose');

const SillaSchema = new mongoose.Schema({
  tipoSilla: {
    type: String,
    required: true
  },
  precioSilla: {
    type: Number,
    required: true
  },
  stockSilla: {
    type: Number,
    required: true
  }
});

const Silla = mongoose.model('Silla', SillaSchema);

module.exports = Silla;
