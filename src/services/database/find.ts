import { connectToDatabase } from "./mongodb";

export async function find(collection: string, findKey: {}) {
   try {
      const { db, client } = await connectToDatabase();
      if (client) {
         const cursor = await db.collection(collection).find(findKey);
         const searched = await cursor.toArray();
         if (searched) {
            return { success: true, searched };
         } else {
            return { success: false, searched: null, error: 'Usuário não encontrado!' };
         }
      }      
   } catch (error) {
      return { success: false, searched: null, error };
   }
}