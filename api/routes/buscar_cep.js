const express = require('express');
const buscarCepController = require('../controllers/buscar_cep');
const router = express.Router();

router.get('/:cep', (req, res) => {
  buscarCepController.buscarCep(req, res);
});

module.exports = router;
