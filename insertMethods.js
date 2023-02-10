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

//Constante para almacenar un documento de ejemplo
const sampleAccount = {
  account_holder: "Linus Torvalds",
  account_id: "MDB829001337",
  account_type: "checking",
  balance: 50352434,
};

//Funcion para insertar un documento en la coleccion
const main = async () => {
  try {
    await connectDb();
    // insertOne method is used here to insert the sampleAccount document
    //InsertMany method is used to insert multiple documents
    let result = await accountsCollection.insertOne(sampleAccount);
    console.log(`Inserted document: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error inserting document: ${err}`);
  } finally {
    await client.close();
  }
};
