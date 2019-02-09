const database = require('./firebaseDatabase')();
const ref = database.ref("sevenElevenBP");

module.exports = (callback)=>{
//  ref.keepSynced(false);
  ref.on('value', callback);
};
