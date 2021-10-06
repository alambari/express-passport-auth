const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const middleware = require('./app/lib/middleware')

const port = 8181;

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

app.get('/users/detail/:id', middleware.isAuthenticated, (req, res) => {
  res.send(req.params)
});

// app.get('/', middleware.isAuthenticated, (req, res) => {
//   res.json({username:req.user.username, email:req.user.email})
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})