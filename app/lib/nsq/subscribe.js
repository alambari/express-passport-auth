const nsq = require('nsqjs')

module.exports = ({ lookupdAddresses, topic, channel }, cb) => {
  console.info('Start listening NSQ : ', topic)

  const r = new nsq.Reader(topic, channel, {
    lookupdHTTPAddresses: lookupdAddresses
  })

  r.connect()
  
  r.on(nsq.Reader.ERROR, err => {
    console.log('NSQ Reader error:', err)
  })

  r.on(nsq.Reader.NSQD_CONNECTED, (port, host) => {
    console.info('NSQ connected PORT {%s:%s}', port, host, topic)
  })

  r.on('message', msg => {
    console.log('Received message [%s] [%s]: %s', channel, msg.id, msg.body.toString())
    msg.finish()
    
    cb(msg.body.toString())
  })
}