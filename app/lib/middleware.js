const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const JsonWebToken = require('jsonwebtoken');

const secret = 'TestTest';
const users = [
  {id: 1, username:'john.doe',password:'password', email:'john.doe@example.com'},
  {id: 2, username:'jane.doe',password:'password',email:'jane.doe@example.com'}
];

function findByUser(username, cb) {
  return users.find(item => {
    if(item.username == username) {
      return cb(null, item)
    }

    return cb(null, null) 
  })
}

passport.use(new BasicStrategy(
  (username, password, done) => {

    process.nextTick(() => {

      findByUser(username, (err, user) => {

        if(err) {
          return done(err)
        }
  
        if(!user) {
          return done(null, false)
        }
  
        if(user.password != password) {
          return done(null, false)
        }
  
        return done(null, user)
  
      })
  
    })
  }
));

passport.use(new BearerStrategy(
  (token, done) => {

    JsonWebToken.verify(token, secret, (err, { username }) => {
      findByUser(username, (err, user) => {

        if(err) {
          return done(err)
        }
  
        if(!user) {
          return done(null, false)
        }
  
        if(user.username != username) {
          return done(null, false)
        }
  
        return done(null, user)
  
      });

    });
  }
));

exports.strategyBasic = passport.authenticate('basic', { session : false });
exports.strategyBearer = passport.authenticate('bearer', { session : false });
exports.users = users;
exports.secret = secret;
exports.findByUser = findByUser;