const router = require('express').Router()
const { Game } = require('../models')
const passport = require('../config/auth')

router.get('/games', (req, res, next) => {
  Game.find()
  .sort({ createdAt: -1 }) // Newest game first
  .then((games) => res.json(games)) // Send data in JSON format
  .catch((error) => next(error)) // Forward any errors to error handler
  })

  .get('/games/:id', (req, res, next) => {
  const id = req.params.id
  Game.findById(id)
    .then((game) => {
      if (!game) { return next() }
      res.json(game)
    })
    .catch((error) => next(error))
  })

  .post('/games',  (req, res, next) => {
  let newGame = req.body
  Game.create(newGame)
    .then((game) => res.json(game))
    .catch((error) => next(error))
  })

  .put('/games/:id',  (req, res, next) => {
  const gameId = req.params.id
  let update = req.body

  Game.findOneAndUpdate(gameId, update)
    .then((game) => res.json(game))
    .catch((error) => next(error))
  })

  .patch('/games/:id',  (req, res, next) => {
  const gameId = req.params.id
  let update = req.body


  Game.findOneAndUpdate(gameId, update)
    .then((game) => res.json(game))
    .catch((error) => next(error))
  })

  .delete('/games/:id',  (req, res, next) => {
  const gameId = req.params.id

  Game.findOneAndRemove(gameId)
    .then((game) => res.json(game))
    .catch((error) => next(error))
  })
  // Game.findOneAndRemove()
  //   .then((removed) => res.json(removed))
  //   .catch((error) => next(error))
  // })


module.exports = router
