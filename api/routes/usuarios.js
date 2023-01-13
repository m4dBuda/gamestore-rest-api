const express = require('express');
const usuariosController = require('../controllers/usuarios');
const router = express.Router();

router.get('/', (req, res) => {
  usuariosController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  usuariosController.getById(req, res);
});

router.post('/', (req, res) => {
  usuariosController.create(req, res);
});

router.put('/:id', (req, res) => {
  usuariosController.update(req, res);
});

router.delete('/:id', (req, res) => {
  usuariosController.delete(req, res);
});

module.exports = router;
