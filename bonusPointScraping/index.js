var admin = require("firebase-admin");
var serviceAccount = require("../api-keys/firebase-secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lowson-8f86f.firebaseio.com"
});

(async()=>{
  Promise.all([await require('./famimaBonusPoint')(admin),
  await require('./lowsonBonusPoint')(admin),
  await require('./sevenElevenBonusPoint')(admin)]).then(()=>{
    process.exit();
  })
})();
