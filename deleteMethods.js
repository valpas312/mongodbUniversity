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

// Constante para filtrar los documentos a eliminar
const documentsToDelete = { balance: { $lt: 500 } };

const main = async () => {
  try {
    await connectDb();
    let result = await accountsCollection.deleteMany(documentsToDelete);
    result.deletedCount > 0
      ? console.log(`Deleted ${result.deletedCount} documents`)
      : console.log("No documents deleted");
  } catch (err) {
    console.error(`Error deleting documents: ${err}`);
  } finally {
    await client.close();
  }
};

main();

// Se puede usar deleteOne para eliminar un solo documento de la misma manera que deleteMany
