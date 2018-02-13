const router = require('express').Router()
const { Recipe } = require('../models')
const passport = require('../config/auth')

router.get('/recipes', (req, res, next) => {
  Recipe.find()
  .sort({ createdAt: -1 }) // Newest recipe first
  .then((recipes) => res.json(recipes)) // Send data in JSON format
  .catch((error) => next(error)) // Forward any errors to error handler
  })

  .get('/recipes/:id', (req, res, next) => {
  const id = req.params.id
  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) { return next() }
      res.json(recipe)
    })
    .catch((error) => next(error))
  })

  .post('/recipes',  (req, res, next) => {
  let newRecipe = req.body
  Recipe.create(newRecipe)
    .then((recipe) => res.json(recipe))
    .catch((error) => next(error))
  })

  .put('/recipes/:id',  (req, res, next) => {
  const recipeId = req.params.id
  let update = req.body

  Recipe.findOneAndUpdate(recipeId, update)
    .then((recipe) => res.json(recipe))
    .catch((error) => next(error))
  })

  .patch('/recipes/:id',  (req, res, next) => {
  const recipeId = req.params.id
  let update = req.body


  Recipe.findOneAndUpdate(recipeId, update)
    .then((recipe) => res.json(recipe))
    .catch((error) => next(error))
  })

  .delete('/recipes/:id',  (req, res, next) => {
  const recipeId = req.params.id

  Recipe.findOneAndRemove(recipeId)
    .then((recipe) => res.json(recipe))
    .catch((error) => next(error))
  })
  // Recipe.findOneAndRemove()
  //   .then((removed) => res.json(removed))
  //   .catch((error) => next(error))
  // })


module.exports = router
