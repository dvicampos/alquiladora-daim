const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Ruta para obtener los datos del stock
router.get('/stock-data', stockController.getStockData);

module.exports = router;
