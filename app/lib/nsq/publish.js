const nsq = require('nsqjs')

const writer = () => {
  
  return new Promise((resolve, reject) => {
    
    const w = new nsq.Writer('127.0.0.1', 4150)

    w.connect();

    w.on(nsq.Writer.ERROR, e => {

      console.log('NSQ Error Connection', e)

      reject(e)

    })

    w.on(nsq.Writer.READY, () => {
      
      console.log('NSQ Ready!');

      resolve(w)
      
    })
    
  })

}

module.exports = async (topic, message) => {

  const w = await writer();

  w.publish(topic, message)
}
