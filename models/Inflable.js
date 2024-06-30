const mongoose = require('mongoose');

const InflableSchema = new mongoose.Schema({
  tipoInflables: {
    type: String,
    required: true
  },
  precioInflables: {
    type: Number,
    required: true
  },
  stockInflables: {
    type: Number,
    required: true
  }
});

const Inflable = mongoose.model('Inflable', InflableSchema);

module.exports = Inflable;
