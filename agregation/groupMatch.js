const { MongoClient } = require("mongodb");

const uri = require("../atlas_uri.js");

const client = new MongoClient(uri);
const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);

const pipeline = [
  { $match: { balance: { $lt: 1000 } } },
  {
    $group: {
      _id: "$account_type",
      total_balance: { $sum: "$balance" },
      avg_balance: { $avg: "$balance" }
    }
  }
];

const main = async () => {
  try {
    await client.connect();
    let result = await accountsCollection.aggregate(pipeline);
    await result.forEach((doc) => console.log(doc));
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

main();
