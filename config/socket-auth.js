const io = require('socket.io')()
const jwtAuth = require('socketio-jwt-auth')
const jwtOptions = require('./jwt')
const { User } = require('../models')

const middleware = jwtAuth.authenticate({
  secret: jwtOptions.secretOrKey,
}, (jwtPayload, done) => {
  console.log('payload recieved', jwtPayload)

  User.findById(jwtPayload.id)
    .then((user) => {
      if(user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch((err) => done(err, false))
})

module.exports = middleware
