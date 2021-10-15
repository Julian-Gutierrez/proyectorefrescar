const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioControllers');

router.post('/add', UsuarioController.add);

router.put('/update', UsuarioController.update);

router.put('/enabled', UsuarioController.enabled);

router.put('/disabled', UsuarioController.disabled);

router.get('/list', UsuarioController.list);

router.post('/login', UsuarioController.login);


module.exports = router;