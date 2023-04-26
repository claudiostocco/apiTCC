import { connectToDatabase } from "./mongodb";

export async function insert(collection: string, findKey: {}, data: any) {
   try {
      const { db, client } = await connectToDatabase();

      if (client) {
         const search = await db.collection(collection).findOne(findKey);
         if (!search) {
            const inserted = await db.collection(collection).insertOne(data);
            return { success: true, inserted };
         } else {
            return {
               success: false,
               inserted: null,
               error: 'Usuário já existe!',
            };
         }
      }
   } catch (error) {
      return { success: false, inserted: null, error };
   }
}

export async function insertMany(collection: string, data: any) {
   try {
      const { db, client } = await connectToDatabase();

      if (client) {
         const inserted = await db.collection(collection).insertMany(data);
         return { success: true, inserted };
      }
   } catch (error) {
      return { success: false, inserted: null, error };
   }
}