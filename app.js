const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const { users, strategyBasic, strategyBearer } = require('./app/lib/middleware')

const port = 8181;

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

// app.get('/users/detail/:id', middleware.isAuthenticated, (req, res) => {
//   res.send(req.params)
// });

// app.post('/login', strategyBasic, (req, res) => {
//   // const user = users.some(item => item.username === req.body.username && item.password === req.body.password)
//   return res.json({
//     token: JsonWebToken.sign({username: req.user.username}, secret)
//   })
// })

app.post('/login', strategyBasic, require('./app/login'))

app.all('*', strategyBearer, (req, res, next) => {

  if(!req.user) {
    return res.status(401).json({ status: 'error', code: 'Unauthorized' });
  }

  return next()
})

app.get('/users', (req, res) => {
  return res.json({
    'data': users,
    'message': 'Congratulations ' + req.user.username + '. You have a token.'
  })
})

app.get('/getTopic', require('./app/subscribe'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})