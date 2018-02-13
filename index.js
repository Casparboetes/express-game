const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const { games, users, sessions } = require('./routes')
const http = require('http')
const socketAuth = require('./config/socket-auth')
const socketIO = require('socket.io')

const port = process.env.PORT || 3030

const app = express()
const server = http.Server(app)
const io = socketIO(server)

io.use(socketAuth)

io.on('connect', socket =>{
  socket.emit('ping', `Welcome to the server, ${socket.request.user.name}`)
  console.log(`${socket.request.user.name}, connect to the server`)
})

app
  .use(cors()) // Add a CORS config in there
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(games)
  .use(users)
  .use(sessions)

  // NEXT:catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // NEXT:final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
