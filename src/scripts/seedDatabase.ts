import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { MockArticles } from "@/mock/Articles.mock";
import { MockProfiles } from "@/mock/Profiles.mock";

dotenv.config();
const MongoDbConnectionString = process.env.MONGO_DB_CONNECTION_STRING;
if (!MongoDbConnectionString) {
  throw new Error("MongoDbConnectionString is not defined");
}
const MongoDbDatabaseName = process.env.MONGO_DB_DATABASE_NAME_DEV;
if (!MongoDbDatabaseName) {
  throw new Error("MongoDbDatabaseName is not defined");
}
const MongoDbCollectionsNameProfiles =
  process.env.MONGO_DB_COLLECTION_NAME_PROFILES;
if (!MongoDbCollectionsNameProfiles) {
  throw new Error("MongoDbCollectionsNameProfiles is not defined");
}
const MongoDbCollectionsNameArticles =
  process.env.MONGO_DB_COLLECTION_NAME_ARTICLES;
if (!MongoDbCollectionsNameArticles) {
  throw new Error("MongoDbCollectionsNameArticles is not defined");
}

const client = new MongoClient(MongoDbConnectionString!);

async function seedDatabase(collectionName: string) {
  try {
    await client.connect();
    console.log(`Connected to MongoDB, seeding ${collectionName}`);

    const database = client.db(collectionName);
    const collection = database.collection(collectionName);

    // Optionally clear existing data
    await collection.deleteMany({});

    // Insert data
    if (collectionName === MongoDbCollectionsNameProfiles) {
      // Insert profiles
      const result = await collection.insertMany(MockProfiles);
      console.log(`${result.insertedCount} profiles have been added.`);
    } else if (collectionName === MongoDbCollectionsNameArticles) {
      // Insert articles
      const result = await collection.insertMany(MockArticles);
      console.log(`${result.insertedCount} articles have been added.`);
    } else {
      console.error("Invalid collection name");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await client.close();
    console.log("Connection to MongoDB closed");
  }
}

async function main() {
  const args = process.argv.slice(2); // Get arguments passed to the script
  const collectionType = args[0]; // The first argument should be the collection type (articles or profiles)

  if (!collectionType) {
    console.error(
      'Please provide a collection type: "profiles" or "articles".'
    );
    process.exit(1);
  }

  if (collectionType === "profiles") {
    await seedDatabase(MongoDbCollectionsNameProfiles!);
  } else if (collectionType === "articles") {
    await seedDatabase(MongoDbCollectionsNameArticles!);
  } else {
    console.error('Invalid collection type. Use "prfiles" or "articles".');
    process.exit(1);
  }
}

main();
