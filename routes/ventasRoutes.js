const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.listarVentas);
router.get('/nueva', ventasController.mostrarFormulario);
router.post('/', ventasController.realizarVenta);
router.get('/ventas/pdf/:id', ventasController.generarPDF);


module.exports = router;

