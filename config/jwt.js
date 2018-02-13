const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt

module.exports = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'verysecret'
}

// industry standard way of dealing with authentication, BearerToken,
// leave it to the client to store it.
//  creates a hash, need them to be salted, token goes into a mangle
// of more characters. SALT YOUR HASHES!
// SECRET AND verysecret are for development purposes.
