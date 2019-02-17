const Twitter = require('twitter');

module.exports = async(admin) => {

  var db = admin.database();
  var ref = db.ref("lowsonBP2"); //room1要素への参照
  ref.set(pageData);
  await ref.on("value", (data)=>{
    //console.log('output', data.val());
  });
};
