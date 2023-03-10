const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

router.post('/', (req, res) => {
  loginController.login(req, res);
});

router.put('/:id', (req, res) => {
  loginController.alterarSenha(req, res);
});

router.delete('/:id', (req, res) => {
  loginController.logoff(req, res);
});

module.exports = router;
