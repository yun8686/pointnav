const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();
const getData = require('../connections/famimaData');
/* GET home page. */
router.get('/', function(req, res, next) {
  getData((value)=>{
    console.log("------------------ data updated -------------------");
    const data = value.val();
    console.log("data", data);
    res.render('unitPointList', {
      self: true,
      title: 'ファミリーマート - ボーナスポイント比較ナビ -',
      info_text: "ファミリーマートで獲得できるボーナスポイントを還元率順に並べて表示しています。",
      data: data,
    });
  });

});

module.exports = router;
