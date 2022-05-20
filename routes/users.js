var express = require('express');
var router = express.Router();
var movies = ['SoutPark',"Last Man Down" ,"The Departed"];


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/myname', function(req, res, next) {
  res.send('Dan Rothwell');
});


router.get('/favoritemovies', function(req, res, next) {
  res.json(movies);
});

module.exports = router;
