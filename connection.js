const { MongoClient, ServerApiVersion } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://chomzy123:chomzy123@cluster0.4avgxge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    await listDatabases(client);
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
  const adminDB = client.db().admin();
  databasesList = await adminDB.listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};