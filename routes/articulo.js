const express = require('express');
const router = express.Router();

const ArticuloController = require('../controllers/ArticuloController');

router.post('/add', ArticuloController.add);

router.put('/update', ArticuloController.update);

router.put('/enabled', ArticuloController.enabled);

router.put('/disabled', ArticuloController.disabled);

router.get('/list', ArticuloController.list);

router.delete('/remove', ArticuloController.remove);



module.exports = router;