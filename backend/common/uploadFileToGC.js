var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");
const { v1: uuidv1 } = require("uuid");

// Initialize Admin App
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "staff-managemen.appspot.com",
});

// Initialize Cloud Storage and get a reference to the service
// const storage = () => getStorage(admin);

module.exports = async function (file, name) {
  if (!name) name = uuidv1();
  await admin.storage().bucket().file(name).save(file);
  return name;
};
