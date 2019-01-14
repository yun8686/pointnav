var express = require('express');
const functions = require('firebase-functions');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.js Test' });
});

module.exports = router;
