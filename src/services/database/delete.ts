import { connectToDatabase } from "./mongodb";

export async function remove(collection: string, findKey: {}) {
   try {
      const { db, client } = await connectToDatabase();

      if (client) {
         const deleted = await db.collection(collection).deleteOne(findKey);
         return { success: true, deleted };
      }
   } catch (error) {
      return { success: false, deleted: null, error };
   }
}