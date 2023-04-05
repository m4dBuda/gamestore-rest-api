const express = require('express');
const apiPagSeguroController = require('../controllers/api_pagseguro');
const router = express.Router();

router.post('/', (req, res) => {
  apiPagSeguroController.criarCobrança(req, res);
});

module.exports = router;
