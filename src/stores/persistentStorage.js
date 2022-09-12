/**
 * Persistent storage to IndexedDb
 */
import Dexie from 'dexie'

export const db = new Dexie('shopperhopper')

// Declare tables, IDs and indexes
db.version(1).stores({
  products: '++id',
  stores: '++id',
  shoppingList: 'productid, listid',
  lists: '++id',
  settings: 'name',
})

//export default db
