const Inflable = require('../models/Inflable');
const Lona = require('../models/Lona');
const Mesa = require('../models/Mesa');
const Silla = require('../models/Silla');

exports.getStockData = async (req, res) => {
  try {
    const inflables = await Inflable.find({});
    const mesas = await Mesa.find({});
    const sillas = await Silla.find({});
    const lonas = await Lona.find({});
    
    const inflableStock = inflables.map(item => ({
      tipo: item.tipoInflables,
      stock: item.stockInflables
    }));
    const mesaStock = mesas.map(item => ({
      tipo: item.tipoMesa,
      stock: item.stockMesa
    }));
    const sillaStock = sillas.map(item => ({
      tipo: item.tipoSilla,
      stock: item.stockSilla
    }));
    
    const lonaStock = lonas.map(item => ({
      tipo: item.tipoLona,
      stock: item.stockLona
    }));

    res.json({ inflableStock, lonaStock, mesaStock, sillaStock });
  } catch (err) {
    res.status(500).send('Error al obtener datos del stock');
  }
};
