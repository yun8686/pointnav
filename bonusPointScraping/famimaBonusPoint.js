const puppeteer = require('puppeteer');

module.exports = async(admin) => {
    /**
     * ファミリーマートのサイトからボーナスポイントの情報を取得して
     * FireBaseに保存するスクリプト
     */
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('http://www.family.co.jp/campaign/pointplus.html'); // 表示したいURL
    const pageData = await page.evaluate(()=>{
      var source = [];
      document.querySelectorAll('.ly-mod-def-tbl tbody tr').forEach(v=>{
        v.querySelectorAll("img,.ly-manufacturer,.ly-productname,.ly-amout,.ly-txt").forEach(w=>{
          source.push(w);
        });
      });

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
        return {
          image: item[0],
          company: item[1],
          itemName: item[2] + item[3],
          price: parseInt(item[5].match(/[\d,]+円/)[0].replace(",","")),
          priceText: item[5],
          termText: item[6],
          point: parseInt(item[4].match(/[\d,]+ポイント/)[0].replace(",","")),
          pointText: item[4].match(/[\d,]+ポイント/)[0],
        };
      }).map(item=>{
        // 集計する
        try{
          if(item.price == 0){item.unitrate = 0;}
          else{
            item.unitRate = item.point/item.price;
            item.unitRate = Math.round(item.unitRate * 1000)/10;
          }
        }catch(e){console.log(e,item);}
        return item;
      }).filter(v=>v&&v.unitRate)
      .map(item=>{
        // マークを付ける
        if(item.unitRate >= 35.0) item.mark = "gold";
        else if(item.unitRate >= 25.0) item.mark = "silver";
        else if(item.unitRate >= 15.0) item.mark = "bronze";
        else item.mark = "other";
        return item;
      }).sort((a,b)=>b.unitRate-a.unitRate);
    });
    console.log("pageData", pageData);
    /*（何か処理）*/
    browser.close();

    var db = admin.database();
    var ref = db.ref("famimaBP"); //room1要素への参照
    ref.set(pageData);
    await ref.on("value", (data)=>{
      //console.log('output', data.val());
    });
};
