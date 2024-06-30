const express = require('express');
const router = express.Router();
const manteleriaController = require('../controllers/manteleriaController');

// Rutas de lonas
router.get('/mantelerias', manteleriaController.getAllMantelerias);
router.get('/mantelerias/add', manteleriaController.getAddManteleria);
router.post('/mantelerias/add', manteleriaController.postAddManteleria);
router.get('/mantelerias/edit/:id', manteleriaController.getEditManteleria);
router.post('/mantelerias/edit/:id', manteleriaController.postEditManteleria);
router.get('/mantelerias/delete/:id', manteleriaController.deleteManteleria);

module.exports = router;
