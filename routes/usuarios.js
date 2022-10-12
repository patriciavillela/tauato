var express = require('express');
const { response } = require('../app');
var router = express.Router();

var Usuarios = require('../models/usuarios')
var Reacoes = require('../models/reacoes')
var validateToken = require('../middleware/validateToken');

router.get('/reacoes', validateToken.tokenValidated, function(req, res, next) {
  const user = JSON.parse(req.headers['user'])
  Reacoes.findAll({where: {usuarioId: user.id}})
  .then(e => {
    res.send(e)
  }).catch(e => {
    console.log(e)
  })
});

router.post('/', function(req, res, next) {
  Usuarios.create({'username': req.body.username, 'password': req.body.password})
  .then(() => {
    res.sendStatus(201)
  })
  .catch(e => {
    if (e.name === "SequelizeUniqueConstraintError") {
      let errors = e.errors.map(e => e.message)
      res.status(400)
      res.send(errors)
    }
    console.log(e)
    res.sendStatus(500)
  })
})

module.exports = router;
