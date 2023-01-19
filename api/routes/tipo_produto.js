const express = require('express');
const tipoProdutoController = require('../controllers/tipo_produto');
const router = express.Router();

router.get('/', (req, res) => {
  tipoProdutoController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  tipoProdutoController.getById(req, res);
});

router.post('/', (req, res) => {
  tipoProdutoController.create(req, res);
});

router.put('/:id', (req, res) => {
  tipoProdutoController.update(req, res);
});

router.delete('/:id', (req, res) => {
  tipoProdutoController.delete(req, res);
});

module.exports = router;
