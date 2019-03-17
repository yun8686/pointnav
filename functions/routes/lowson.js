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
      info_text:
          "Lawsonで獲得できるボーナスポイントを還元率順に並べて表示しています。" + "<br>" +
          "複数商品を同時に表示している場合は、最安の組合せパターンで計算しています。" + "<br>" +
          "データ取得元： <a href='https://www.lawson.co.jp/ponta/tameru/bonus/index.html'>https://www.lawson.co.jp/ponta/tameru/bonus/index.html</a>",
      data: lowsonData,
    });
  });

});

module.exports = router;
