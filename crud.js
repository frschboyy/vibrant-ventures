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
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    /* Create a single new listing
    await createListing(client, {
        name: "Lovely Loft",
        summary: "A charming loft in Paris",
        bedrooms: 1,
        bathrooms: 1
    });*/

    /*/ Create Multiple Listings
    await createMultipleListings(client, [
        { 
            name: "Infinite Views",
            summary: "Modern home with infinite views from the infinity pool",
            property_type: "House",
            bedrooms: 5,
            bathrooms: 4.5,
            beds: 5
        },
        {
            name: "Private room in London",
            property_type: "Apartment",
            bedrooms: 1,
            bathroom: 1
        },
        {
            name: "Beautiful Beach House",
            summary: "Enjoy relaxed beach living in this house with a private beach",
            bedrooms: 4,
            bathrooms: 2.5,
            beds: 7,
            last_review: new Date()
        }
    ]);*/

    //await findOneListingByName(client, "Infinite Views")

    await findMultipleListingsByName(client, {
        mNumberofBedrooms: 4,
        mNumberofBathrooms: 2,
        mNumberofResults: 5
    })

  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);

async function createListing(client, newListing){
  const clientDB = client.db("sample_airbnb").collection("listingsAndReviews");
  const result = await clientDB.insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createMultipleListings(client, newListings){
  const clientDB = client.db("sample_airbnb").collection("listingsAndReviews");
  const result = await clientDB.insertMany(newListings);
  console.log(`${result.insertedCount} New listing(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

async function findOneListingByName(client, nameOfListing) {
    const readEntry = client.db("sample_airbnb").collection("listingsAndReviews");
    const result = await readEntry.findOne({name: nameOfListing});

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function findMultipleListingsByName(client, {
    minNumofBedroom = 0,
    minNumofBathroom = 0,
    maxNumOfResult = Number.MAX_SAFE_INTEGER
} = {}) {
    const entries = client.db("sample_airbnb").collection("listingsAndReviews");
    const cursor = entries.find({
            bedrooms: { $gte: minNumofBedroom },
            bathrooms: { $gte: minNumofBathroom }
        }).sort({ last_review: -1}).limit(maxNumOfResult);
    
        const result = await cursor.toArray();

        if (results.length > 0) {
            console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
            results.forEach((result, i) => {
                date = new Date(result.last_review).toDateString();
    
                console.log();
                console.log(`${i + 1}. name: ${result.name}`);
                console.log(`   _id: ${result._id}`);
                console.log(`   bedrooms: ${result.bedrooms}`);
                console.log(`   bathrooms: ${result.bathrooms}`);
                console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
            });
        } else {
            console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
        }
    }