const database = require('./firebaseDatabase')();
const ref = database.ref("famimaBP");

module.exports = (callback)=>{
//  ref.keepSynced(false);
  ref.on('value', callback);
};
