const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('../config/auth')
const { User } = require('../models')
const jwtOptions = require('../config/jwt')

router.post('/sessions', passport.authenticate('local'), (req, res) => {
  const payload = { id: req.user.id }
  const token = jwt.sign(payload, jwtOptions.secretOrKey)
  res.json({ token })
})

module.exports = router

// allows clients to post to sessions, ask them to authenticate them selfs,
// first you through middleware then you through route handler,
// payload is object with user.id, you can add more stuff there,
// it is all signed and serialized and put into a token.
