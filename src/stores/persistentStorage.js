/**
 * Persistent storage to IndexedDb
 */
 import Dexie from 'dexie';
 
 export const db = new Dexie('shopper-hopper');

 // Declare tables, IDs and indexes
 db.version(1).stores({
     products: '++id, name',
     stores: '++id, name',
     shoppingList: 'productid'
 });

//export default db
