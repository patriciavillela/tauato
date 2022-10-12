const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const {PRIVATE_KEY, tokenValidated} = require('../middleware/validateToken');

const Usuarios = require('../models/usuarios')

router.post('/', function(req, res, next) {
  console.log(req.body)
  Usuarios.findOne({ where: {'username': req.body.username}})
  .then(e => {
    if (!e) {
      res.sendStatus(404)
    }
    e.validPassword(req.body.password, e.password)
    .then((validPassword) => {
      if (!validPassword) {
        res.sendStatus(404)
      }
      e.password = null
      const token = jwt.sign(
        { user: JSON.stringify(e) },
        PRIVATE_KEY,
        { expiresIn: 60 * 24 + 'm' }
      )
      res.status(200).send(token)
    }).catch(e => {
      console.log(e)
    })
  }).catch(e => {
    res.sendStatus(500)
  })
});

module.exports = router;
