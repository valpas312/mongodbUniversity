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

// Constante para filtrar los documentos a actualizar
const documentsToUpdate = { account_type: "checking" };

// Constante con el operador de actualizacion
const update = { $push: { transfers_complete: "TR413308000" } };

const main = async () => {
  try {
    await connectDb();
    let result = await accountsCollection.updateMany(documentsToUpdate, update);
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No documents updated");
  } catch (err) {
    console.error(`Error updating documents: ${err}`);
  } finally {
    await client.close();
  }
};

// Se puede usar updateOne para actualizar un solo documento de la misma manera que updateMany
