const { MongoClient } = require("mongoDb");

const uri = require("./atlas_uri.js");

console.log(uri);

const client = new MongoClient(uri);

//Funcion para conectarse a la base de datos
const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

//Constantes para almacenar el nombre de la base de datos y la coleccion
const dbname = "bank";
const collection_name = "accounts";

//Constante para almacenar la coleccion
const accountsCollection = client.db(dbname).collection(collection_name);

// Document used as a filter for the find() method
const documentsToFind = { balance: { $gt: 4700 } };

const main = async () => {
  try {
    await connectDb();
    // find() method is used here to find documents that match the filter
    let result = accountsCollection.find(documentsToFind);
    // countDocuments() method is used here to count the number of documents that match the filter
    let docCount = accountsCollection.countDocuments(documentsToFind);
    await result.forEach((doc) => console.log(doc));
    console.log(`Found ${await docCount} documents`);
  } catch (err) {
    console.error(`Error finding documents: ${err}`);
  } finally {
    await client.close();
  }
};

//Al igual que con insertOne e insertMany, find y findOne funcionan casi de la misma manera
