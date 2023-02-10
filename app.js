const { MongoClient } = require("mongoDb");

const uri = require("./atlas_uri.js");

console.log(uri);

const client = new MongoClient(uri);

//Funcion para conectarse a la base de datos
const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
    const databaseList = await client.db().admin().listDatabases();
    console.log(databaseList.databases);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};