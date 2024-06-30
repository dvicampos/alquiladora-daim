const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');

// Rutas de lonas
router.get('/mesas', mesaController.getAllMesas);
router.get('/mesas/add', mesaController.getAddMesa);
router.post('/mesas/add', mesaController.postAddMesa);
router.get('/mesas/edit/:id', mesaController.getEditMesa);
router.post('/mesas/edit/:id', mesaController.postEditMesa);
router.get('/mesas/delete/:id', mesaController.deleteMesa);

module.exports = router;
