const express = require('express');
const tipoProdutoController = require('../controllers/tipo_produto');
const router = express.Router();

router.get('/', (req, res) => {
  loginController.login(req, res);
});

module.exports = router;
