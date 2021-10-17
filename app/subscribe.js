const nsqSubscribe   = require('./lib/nsq/subscribe')

module.exports = (req, res) => {

  nsqSubscribe({lookupdAddresses: '127.0.0.1:4161', topic: 'USER_LOGIN', channel: 'LOGIN_CHANNEL'}, (message) => {

    res.json({message: message})

  })

}