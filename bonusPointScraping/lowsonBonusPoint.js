const puppeteer = require('puppeteer');

module.exports = async(admin) => {
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
    console.log("goto from");
    await page.goto('https://www.lawson.co.jp/ponta/tameru/bonus/list/1247156_3654.html'); // 表示したいURL
    console.log("goto to");
    keylog = console.log;
    const pageData = await page.evaluate(()=>{
      console.log("page");
      var source = document.querySelectorAll('#sec-02 .rightBlock p,dd,#sec-02 img,.note font');
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
            if(source[i].innerHTML.indexOf('税込') >= 0){
              var text = source[i].innerHTML.match(/\(税込[\d,]+円\)/);
              if(text){
                items[itemIdx].push(text[0].replace(/[\(\)税込]/g, ""));
              }
            }else{
              items[itemIdx].push(source[i].innerText);
            }
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
        }else if(item.length >= 7){
          if(item[1] == "一緒に買うとボーナスポイント"){
            return null;
          }
          if(item[2] == "デカビタC"){
            return null;
          }
          if(item[1] == "※夕夜間限定16:00～21:59"){
            return {
              image: item[0],
              company: item[2],
              itemName: item[3],
              priceText: item[4],
              termText: item[5] + "\n" + item[1],
              pointText: item[6],
            };
            throw JSON.stringify(item);
          }
        }
      }).filter(v=>v).map(item=>{
        // 集計する
        item.point = parseInt(item.pointText);
        item.price = Number(item.priceText.match(/([\d,]+)/)[1].replace(/,/g,""));
        item.unitRate = item.point/item.price;
        item.unitRate = Math.round(item.unitRate * 1000)/10;

        item.termStart = new Date((new Date()).getFullYear()+"/" + item.termText.split("～")[0].replace(/^(\d+)月(\d+).*$/, "$1/$2"))-0;
        item.termEnd = new Date((new Date()).getFullYear()+"/" + item.termText.split("～")[1].replace(/^(\d+)月(\d+).*$/, "$1/$2"))-0;
        return item;
      })
      .map(item=>{
        // マークを付ける
        if(item.unitRate >= 35.0) item.mark = "gold";
        else if(item.unitRate >= 25.0) item.mark = "silver";
        else if(item.unitRate >= 15.0) item.mark = "bronze";
        else item.mark = "other";
        return item;
      }).sort((a,b)=>b.unitRate-a.unitRate);
    });
    /*（何か処理）*/
    console.log("pageData", pageData)
    browser.close();
    var db = admin.database();
    var ref = db.ref("lowsonBP2"); //room1要素への参照
    ref.set(pageData);
    await ref.on("value", (data)=>{
      //console.log('output', data.val());
    });
};
