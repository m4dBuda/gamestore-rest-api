const express = require('express');
const http = require('http');
const morgan = require('morgan');

const produtosRoutes = require('./api/routes/produtos');
const usuariosRoutes = require('./api/routes/usuarios');
const loginRoutes = require('./api/routes/login');
const tipoProdutoRoutes = require('./api/routes/tipo_produto');
const carrinhoRoutes = require('./api/routes/carrinho');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

const httpServer = http.createServer(app);
httpServer.listen(13700);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  if (req.query.nomedb === undefined) {
    const error = Error('Banco de dados não encontrado.');
    error.status = 400;
    return res.status(error.status).send({ error: error.message });
  }
  next();
});

app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/tipo_produto', tipoProdutoRoutes);
app.use('/carrinho', carrinhoRoutes);

app.use((req, res, next) => {
  const error = Error('Not allowed.');
  error.status = 404;
  next(error);
});

app.use((error, res) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
