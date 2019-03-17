const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();
const getData = require('../connections/sevenElevenData');
/* GET home page. */
router.get('/', function(req, res, next) {
  getData((value)=>{
    console.log("------------------ data updated -------------------");
    const data = value.val();
    console.log("data", data);
    res.render('unitPointList', {
      self: true,
      title: 'セブンイレブン - ボーナスポイント比較ナビ -',
      info_text: "セブンイレブンで獲得できるボーナスポイントを還元率順に並べて表示しています。",
      data: data,
    });
  });

});

module.exports = router;
