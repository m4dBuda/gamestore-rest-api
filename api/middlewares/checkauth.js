const jwt = require('jsonwebtoken');
const strings = require('../helpers/strings');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      error: 'Não autorizado. Para realizar requisições na API é necessário realizar o login.',
    });
  }
  try {
    const decoded = jwt.verify(token, strings.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      error: 'Token inválido. Faça o login novamente.',
    });
  }
};
