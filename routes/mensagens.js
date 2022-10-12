var express = require('express');
const { routes } = require('../app');
var router = express.Router()

var Mensagem = require('../models/mensagens')
var Reacao = require('../models/reacoes')
const db = require('../db')
const { QueryTypes } = require('sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = JSON.parse(req.headers['user'])
  db.query(`
    SELECT
      id,
      massa,
      paia
    FROM mensagens
    LEFT JOIN (
      SELECT
        mensagemId,
        SUM(CASE WHEN reacao = 'massa' THEN 1 ELSE 0 END) as massa,
        SUM(CASE WHEN reacao = 'paia' THEN 1 ELSE 0 END) as paia
      FROM reacoes
      GROUP BY mensagemId) t ON mensagens.id = t.mensagemId
    WHERE usuarioId = ${user.id}
    GROUP BY id`,
  { type: QueryTypes.SELECT }).then(e => {
      res.send(e)
    }).catch(e => {
      console.log(e)
    })
});

router.post('/', function(req, res, next) {
  const user = JSON.parse(req.headers['user'])
  Mensagem.create({
    'texto': req.body.texto,
    'usuarioId': user.id,
    'marcadorDeTom': req.body.marcadorDeTom
  }).then(() => res.sendStatus(201))
    .catch(e => {
      console.log(e)
      res.sendStatus(400)
    })
})

router.post('/reacao/:mensagemId/:reacao', function(req, res, next) {
  const user = JSON.parse(req.headers['user'])
  Reacao.create({'usuarioId': user.id, 'mensagemId': req.params.mensagemId, 'reacao': req.params.reacao})
  .then((e) => {
    if (!e) res.sendStatus(404);
    res.sendStatus(200)
  }).catch(e => {
    console.log(e)
    res.sendStatus(500)
  })
})

router.delete('/:id', function(req, res, next) {
  const user = JSON.parse(req.headers['user'])
  Mensagem.destroy({where: {id: req.params.id,  usuarioId: user.id}})
  .then((e) => {
    if (!e) res.sendStatus(404);
    res.sendStatus(200)
  }).catch(e => {
    console.log(e)
    res.sendStatus(500)
  })
})

module.exports = router;
