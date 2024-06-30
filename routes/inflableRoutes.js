const express = require('express');
const router = express.Router();
const inflableController = require('../controllers/inflableController');

router.get('/inflables', inflableController.getAllInflables);
router.get('/inflables/add', inflableController.getAddInflable);
router.post('/inflables/add', inflableController.postAddInflable);
router.get('/inflables/edit/:id', inflableController.getEditInflable);
router.post('/inflables/edit/:id', inflableController.postEditInflable);
router.get('/inflables/delete/:id', inflableController.deleteInflable);

module.exports = router;
