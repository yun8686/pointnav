const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();
const getLowsonData = require('../connections/lowsonData');
/* GET home page. */
router.get('/', function(req, res, next) {
  getLowsonData((value)=>{
    console.log("------------------ data updated -------------------");
    const lowsonData = value.val();
    console.log("lowsonData", lowsonData);
    res.render('unitPointList', {
      self: true,
      title: 'ローソン - ボーナスポイント比較ナビ -',
      data: lowsonData,
    });
  });

});

module.exports = router;
