const puppeteer = require('puppeteer');

module.exports = async(admin) => {
    /**
     * セブンイレブンのサイトからボーナスポイントの情報を取得して
     * FireBaseに保存するスクリプト
     */
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('http://www.sej.co.jp/i/nanaco/bonuspoints'); // 表示したいURL
    const pageData = await page.evaluate(()=>{
      var source = [];
      document.querySelectorAll('.nanacoBPImg').forEach(v=>{
        v.querySelectorAll(".image img,.period,.point>strong,.condition").forEach(w=>{
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
            items[itemIdx].push(source[i].dataset.original);
            break;
          default:
            items[itemIdx].push(source[i].innerText);
        }
      }
      const minPrice = (priceText)=>{
        var matches = priceText.match(/([\d,]+)円/g);
        var min = Number.MAX_SAFE_INTEGER;
        if(matches)for(var i=0;i<matches.length;i++){
          min = Math.min(min, Number(matches[i].replace(/[円,]/g,"")));
        }
        if(min === Number.MAX_SAFE_INTEGER) min = 0;
        console.log("priceText", priceText);
        console.log("min", min);
        return min;
      }

      return items.map((item)=>{
        return {
          image: item[0],
          company: "",
          itemName: item[3],
          price: minPrice(item[3]),
          priceText: item[3],
          termText: item[2],
          point: parseInt(item[1]),
          pointText: item[1],
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
    var ref = db.ref("sevenElevenBP"); //room1要素への参照
    ref.set(pageData);
    await ref.on("value", (data)=>{
      //console.log('output', data.val());
    });
};
