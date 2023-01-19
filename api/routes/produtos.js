const express = require('express');
const produtosController = require('../controllers/produtos');
const router = express.Router();

router.get('/', (req, res) => {
  produtosController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  produtosController.getById(req, res);
});

router.post('/', (req, res) => {
  produtosController.create(req, res);
});

router.put('/:id', (req, res) => {
  produtosController.update(req, res);
});

router.delete('/:id', (req, res) => {
  produtosController.delete(req, res);
});

module.exports = router;
