const JsonWebToken = require('jsonwebtoken')
const nsqPublish   = require('./lib/nsq/publish')

const { secret } = require('./lib/middleware')

module.exports = (req, res, next) => {

  nsqPublish(`USER_LOGIN`, {
    message: `USER ${req.user.username} LOGIN`,
    user: req.user
  })

  return res.json({
    token: JsonWebToken.sign({username: req.user.username}, secret)
  })
}