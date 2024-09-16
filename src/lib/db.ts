import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MongoDbConnectionString = process.env.MONGO_DB_CONNECTION_STRING || "";
const MongoDbDatabaseNameDev = process.env.MONGO_DB_DATABASE_NAME_DEV || "";

if (!MongoDbConnectionString || MongoDbConnectionString === "") {
  throw new Error("MongoDbConnectionString is not defined");
}
if (!MongoDbDatabaseNameDev || MongoDbDatabaseNameDev === "") {
  throw new Error("MongoDbDatabaseNameDev is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MongoDbConnectionString, {
        bufferCommands: false,
        dbName: MongoDbDatabaseNameDev,
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
