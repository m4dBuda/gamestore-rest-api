const express = require('express');
const carrinhosController = require('../controllers/carrinhos');
const router = express.Router();

router.get('/', (req, res) => {
  carrinhosController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  carrinhosController.getById(req, res);
});

router.post('/', (req, res) => {
  carrinhosController.create(req, res);
});

router.put('/:id', (req, res) => {
  carrinhosController.update(req, res);
});

router.delete('/:id', (req, res) => {
  carrinhosController.delete(req, res);
});

module.exports = router;
