const express = require('express');
const carrinhoController = require('../controllers/carrinho');
const router = express.Router();

router.get('/', (req, res) => {
  carrinhoController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  carrinhoController.getById(req, res);
});

router.post('/', (req, res) => {
  carrinhoController.create(req, res);
});

router.put('/:id', (req, res) => {
  carrinhoController.update(req, res);
});

router.delete('/:id', (req, res) => {
  carrinhoController.delete(req, res);
});

module.exports = router;
