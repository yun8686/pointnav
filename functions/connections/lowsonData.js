const database = require('./firebaseDatabase')();
const ref = database.ref("lowsonBP2");

module.exports = (callback)=>{
//  ref.keepSynced(false);
  ref.on('value', callback);
};
