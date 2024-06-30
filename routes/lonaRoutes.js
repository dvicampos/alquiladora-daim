const express = require('express');
const router = express.Router();
const lonaController = require('../controllers/lonaController');

// Rutas de lonas
router.get('/lonas', lonaController.getAllLonas);
router.get('/lonas/add', lonaController.getAddLona);
router.post('/lonas/add', lonaController.postAddLona);
router.get('/lonas/edit/:id', lonaController.getEditLona);
router.post('/lonas/edit/:id', lonaController.postEditLona);
router.get('/lonas/delete/:id', lonaController.deleteLona);

module.exports = router;
