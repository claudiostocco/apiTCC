import { connectToDatabase } from "./mongodb";

export async function update(collection: string, findKey: {}, data: any) {
   try {
      const { db, client } = await connectToDatabase();

      if (client) {
         const updated = await db.collection(collection).updateOne(
            findKey,
            { $set: data }
         );
         return { success: true, updated };
      }
   } catch (error) {
      return { success: false, updated: null, error };
   }
}