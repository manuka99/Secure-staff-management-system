const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
var mongoServer;

const DB_Options = {
//   useFindAndModify: false,
//   useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function connect() {
  if (process.env.NODE_ENV && process.env.NODE_ENV.trim() == "test") {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, DB_Options);
  } else await mongoose.connect(process.env.MONGODB_URL, DB_Options);
}

function close() {
  return new Promise((resolve, reject) => {
    mongoose
      .disconnect()
      .then(() =>
        mongoServer
          .stop()
          .then(() => resolve())
          .catch((err) => reject(err))
      )
      .catch((err) => reject(err));
  });
}

async function clearDatabase() {
  const { collections } = mongoose.connection;
  if (collections && collections.length > 0)
    await Promise.all(
      collections.forEach(async (collection, index, array) => {
        console.log(collection);
        await collection.deleteMany();
      })
    );
}

module.exports = { connect, close, clearDatabase };
