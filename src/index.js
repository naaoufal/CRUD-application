const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const fs = require('fs');
var sessions = require('express-session');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const app = express();


const products = require('./phones.json');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/api/phones', require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// call static files
app.get('/', function(req, res){
  res.sendFile(__dirname + "/public/index.html")
});
app.get('/phones', function(req, res){
  res.sendFile(__dirname + "/public/content.html")
});

// Post login data
app.post('/connexion',(req,res)=>{
  const adapter = new FileSync('data.json');
  const db = low(adapter);
  var name = JSON.stringify(req.body);
  var password = JSON.stringify(req.body);
  // var response = JSON.stringify(data, null, 2);
  console.log(name);
  // fs.writeFile('./public/login.json', response, function(err){
  //     console.log(err);
  // });
  // some database call here
  db.defaults({ posts: [], user: {} })
  .write()
 
  // Add a post
  db.get('POST')
    .push({ id: 1, title: 'Here you will found all the Users'})
    .write()
  
  // Set a user using Lodash shorthand syntax
  db.set('user.name', name.req)
  .write()
  res.redirect('/phones');
});

// destroy sessions
app.get('/phones', function(req, res){
  req.session.destroy();
  res.redirect('/');
});

// start the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});

