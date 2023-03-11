const express = require('express');
const http = require('http');
const morgan = require('morgan');
const { config } = require('dotenv');

config();

const checkAuth = require('./api/middlewares/checkauth');

const produtosRoutes = require('./api/routes/produtos');
const usuariosRoutes = require('./api/routes/usuarios');
const loginRoutes = require('./api/routes/login');
const tipoProdutoRoutes = require('./api/routes/tipo_produtos');
const carrinhosRoutes = require('./api/routes/carrinhos');
const buscarCepRoutes = require('./api/routes/buscar_cep');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const httpServer = http.createServer(app);
httpServer.listen(13700);

app.use('/login', loginRoutes);
app.use('/produtos', checkAuth, produtosRoutes);
app.use('/usuarios', checkAuth, usuariosRoutes);
app.use('/tipo_produtos', checkAuth, tipoProdutoRoutes);
app.use('/carrinhos', checkAuth, carrinhosRoutes);
app.use('/buscar_cep', checkAuth, buscarCepRoutes);

app.use((req, res, next) => {
  const error = Error('Rota não encontrada.');
  error.status = 404;
  return res.status(error.status).send({ error: error.message });
  next(error);
});

app.use((error, res) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
