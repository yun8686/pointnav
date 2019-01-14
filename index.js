const puppeteer = require('puppeteer');

(async() => {
    /**
     * ローソンのサイトからボーナスポイントの情報を取得して
     * FireBaseに保存するスクリプト
     */
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.lawson.co.jp/ponta/tameru/bonus/list/1247156_3654.html'); // 表示したいURL
    const pageData = await page.evaluate(()=>{
      var source = document.querySelectorAll('#sec-02 .rightBlock p,dd');
      var ans = [];
      for(var i=0;i<source.length;i+=5){
        if(source[i].innerText == "一緒に買うとボーナスポイント") i++;
        var item = {};
        ans.push(item = {
          company: source[i].innerText,
          itemName: source[i+1].innerText,
          priceText: source[i+2].innerText,
          termText: source[i+3].innerText,
          pointText: source[i+4].innerText,
        });
        item.point = parseInt(item.pointText);
        try{
          item.price = Number(item.priceText.match(/本体価格：([\d,]+)/)[1]);
        }catch(e){
          console.log(item.priceText);
        }
        item.unitPrice = item.price/item.point;
      }
      return ans;
    });
    console.log(pageData[0]);
    /*（何か処理）*/
    browser.close();

    var admin = require("firebase-admin");
    var serviceAccount = require("./lowson-8f86f-firebase-adminsdk-0cvmc-f0d4776856.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://lowson-8f86f.firebaseio.com"
    });

    var db = admin.database();
    var ref = db.ref("lowsonBP"); //room1要素への参照
    ref.push(pageData);
})();
