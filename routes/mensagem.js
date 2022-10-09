var express = require('express');
const { routes } = require('../app');
var router = express.Router()

var Mensagem = require('../models/mensagem')

/* GET home page. */
router.get('/', function(req, res, next) {
  Mensagem.findAll()
    .then(e => {
      res.render('mensagem', { title: 'Mensagem', mensagens: e })
    })
});

router.post('/', function(req, res, next) {
  Mensagem.create({'texto': req.body.texto})
    .then(res.redirect('/mensagem'))
})

router.delete('/:id', function(req, res, next) {
  Mensagem.destroy({where: {id: req.params.id}})
  .then(res.sendStatus(200))
})


module.exports = router;
