import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MongoDbConnectionString = process.env.MONGO_DB_CONNECTION_STRING || "";
const MongoDbDatabaseName = process.env.MONGO_DB_DATABASE_NAME || "";

if (!MongoDbConnectionString || MongoDbConnectionString === "") {
  throw new Error("MongoDbConnectionString is not defined");
}
if (!MongoDbDatabaseName || MongoDbDatabaseName === "") {
  throw new Error("MongoDbDatabaseName is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database using the connection string and database name.
 * @returns mongoose connection
 */
async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MongoDbConnectionString, {
        bufferCommands: false,
        dbName: MongoDbDatabaseName,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Closes the connection to the MongoDB database.
 */
async function closeDatabase() {
  try {
    if (cached.conn) {
      await cached.conn.close();
      cached.conn = null;
      cached.promise = null;
    } else {
      throw new Error("No connection to close");
    }
  } catch (e) {
    throw e;
  }
}

export { connectToDatabase, closeDatabase };
