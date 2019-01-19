const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();


//var ref = db.ref("lowsonBP"); //room1要素への参照
//ref.set(pageData);
//ref.on("value", (data)=>{
//  console.log('output', data.val());
//});


/* GET home page. */
router.get('/', function(req, res, next) {
  const data = [];
  res.render('unitPointList', {
    data: data,
  });
});

module.exports = router;
