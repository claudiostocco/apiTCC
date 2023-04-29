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
            return { success: false, searched: null, error: 'Documento não encontrado!' };
         }
      }      
   } catch (error) {
      return { success: false, searched: null, error };
   }
}

export async function aggregate(collection: string, pipeline: any[]) {
   try {
      const { db, client } = await connectToDatabase();
      if (client) {
         const cursor = await db.collection(collection).aggregate(pipeline);
         const searched = await cursor.toArray();
         if (searched) {
            return { success: true, searched };
         } else {
            return { success: false, searched: null, error: 'Documento não encontrado!' };
         }
      }      
   } catch (error) {
      return { success: false, searched: null, error };
   }
}

export async function distinct(collection: string, key: string) {
   try {
      const { db, client } = await connectToDatabase();
      if (client) {
         const searched = await db.collection(collection).distinct(key);
         if (searched) {
            return { success: true, searched };
         } else {
            return { success: false, searched: null, error: 'Documento não encontrado!' };
         }
      }      
   } catch (error) {
      return { success: false, searched: null, error };
   }
}