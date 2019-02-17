var admin = require("firebase-admin");
var serviceAccount = require("../api-keys/firebase-secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lowson-8f86f.firebaseio.com"
});
