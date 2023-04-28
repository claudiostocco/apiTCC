import { Db, MongoClient } from 'mongodb';

type DatabaseConnect = {
  client: MongoClient;
  db: Db;
}

// let uri = process.env.MONGODB_URI || "";
// let dbName = process.env.MONGODB_DB;
// jn5eSfgW7q10dHwb
// mongodb+srv://pi_user:<password>@cluster0.eyy6ldk.mongodb.net/?retryWrites=true&w=majority

let uri = 'mongodb+srv://api_user:jn5eSfgW7q10dHwb@cluster0.zbzxnhl.mongodb.net/';
let dbName = 'facilitacerqueira';

let cachedClient: any = null;
let cachedDb: any = null;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

export async function connectToDatabase(): Promise<DatabaseConnect> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}