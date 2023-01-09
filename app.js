const { MongoClient } = require("mongoDb");

const uri = require("./atlas_uri.js");

console.log(uri)

const client = new MongoClient(uri);

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

connectDb();