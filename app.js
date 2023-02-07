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
  }
};

//Constantes para almacenar el nombre de la base de datos y la coleccion
const dbname = "bank";
const collection_name = "accounts";

//Constante para almacenar la coleccion
const accountsCollection = client.db(dbname).collection(collection_name);

//Constante para almacenar un documento de ejemplo
// const sampleAccount = {
//   account_holder: "Linus Torvalds",
//   account_id: "MDB829001337",
//   account_type: "checking",
//   balance: 50352434,
// };

//Funcion para insertar un documento en la coleccion
// const main = async () => {
//   try {
//     await connectDb();
//     // insertOne method is used here to insert the sampleAccount document
//     //InsertMany method is used to insert multiple documents
//     let result = await accountsCollection.insertOne(sampleAccount);
//     console.log(`Inserted document: ${result.insertedId}`);
//   } catch (err) {
//     console.error(`Error inserting document: ${err}`);
//   } finally {
//     await client.close();
//   }
// };

// Document used as a filter for the find() method
// const documentsToFind = { balance: { $gt: 4700 } };

// const main = async () => {
//   try {
//     await connectDb();
//     // find() method is used here to find documents that match the filter
//     let result = accountsCollection.find(documentsToFind);
//     // countDocuments() method is used here to count the number of documents that match the filter
//     let docCount = accountsCollection.countDocuments(documentsToFind);
//     await result.forEach((doc) => console.log(doc));
//     console.log(`Found ${await docCount} documents`);
//   } catch (err) {
//     console.error(`Error finding documents: ${err}`);
//   } finally {
//     await client.close();
//   }
// };

//Al igual que con insertOne e insertMany, find y findOne funcionan casi de la misma manera

// Constante para filtrar los documentos a actualizar
const documentsToUpdate = { account_type: "checking" };

// Constante con el operador de actualizacion
const update = { $push: { transfers_complete: "TR413308000" } };

// const main = async () => {
//   try {
//     await connectDb();
//     let result = await accountsCollection.updateMany(documentsToUpdate, update);
//     result.modifiedCount > 0
//       ? console.log(`Updated ${result.modifiedCount} documents`)
//       : console.log("No documents updated");
//   } catch (err) {
//     console.error(`Error updating documents: ${err}`);
//   } finally {
//     await client.close();
//   }
// };


// Se puede usar updateOne para actualizar un solo documento de la misma manera que updateMany

// Constante para filtrar los documentos a eliminar
const documentsToDelete = { balance: { $lt: 500 } }

const main = async () => {
 try {
   await connectDb()
   let result = await accountsCollection.deleteMany(documentsToDelete)
   result.deletedCount > 0
     ? console.log(`Deleted ${result.deletedCount} documents`)
     : console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting documents: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()

// Se puede usar deleteOne para eliminar un solo documento de la misma manera que deleteMany