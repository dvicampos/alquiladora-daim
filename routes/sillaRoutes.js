const express = require('express');
const router = express.Router();
const sillaController = require('../controllers/sillaController');

// Rutas de lonas
router.get('/sillas', sillaController.getAllSillas);
router.get('/sillas/add', sillaController.getAddSilla);
router.post('/sillas/add', sillaController.postAddSilla);
router.get('/sillas/edit/:id', sillaController.getEditSilla);
router.post('/sillas/edit/:id', sillaController.postEditSilla);
router.get('/sillas/delete/:id', sillaController.deleteSilla);

module.exports = router;
