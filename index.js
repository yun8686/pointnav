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
      var source = document.querySelectorAll('#sec-02 .rightBlock p,dd,#sec-02 img');
      var source = document.querySelectorAll('#sec-02 .rightBlock p,dd,#sec-02 img');
      var items = [];
      var itemIdx = -1;
      for(var i=0;i<source.length;i++){
        switch(source[i].tagName.toLowerCase()){
          case 'img':
            ++itemIdx;
            items[itemIdx] = [];
            items[itemIdx].push(source[i].src);
            break;
          default:
            items[itemIdx].push(source[i].innerText);
        }
      }
      return items.map((item)=>{
        if(item.length == 6){
          return {
            image: item[0],
            company: item[1],
            itemName: item[2],
            priceText: item[3],
            termText: item[4],
            pointText: item[5],
          };
        }
      }).map(item=>{
        // 集計する
        try{
          item.point = parseInt(item.pointText);
          item.price = Number(item.priceText.match(/本体価格：各?([\d,]+)/)[1].replace(/,/g,""));
          item.unitRate = item.point/item.price;
          item.unitRate = Math.round(item.unitRate * 1000)/10;
        }catch(e){console.log(e,item);}
        return item;
      }).filter(v=>v)
      .map(item=>{
        // マークを付ける
        if(item.unitRate >= 35.0) item.mark = "gold";
        else if(item.unitRate >= 25.0) item.mark = "silver";
        else if(item.unitRate >= 10.0) item.mark = "bronze";
        else item.mark = "other";
        return item;
      }).sort((a,b)=>b.unitRate-a.unitRate);
    });
    console.log(pageData[0]);
    /*（何か処理）*/
    browser.close();

    var admin = require("firebase-admin");
    var serviceAccount = require("./api-keys/firebase-secret.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://lowson-8f86f.firebaseio.com"
    });

    var db = admin.database();
    var ref = db.ref("lowsonBP2"); //room1要素への参照
    ref.set(pageData);
    await ref.on("value", (data)=>{
      console.log('output', data.val());
    });
})();
