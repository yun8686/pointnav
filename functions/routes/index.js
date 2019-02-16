const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { self: true, title: 'Node.js Test' });
});

module.exports = router;
