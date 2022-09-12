/**
 * SQL database operations using AlaSQL.
 * Operations on top of IndexedDB are asynchronous and require the use of promise().
 */
import alasql from 'alasql'

/*
async function testAla() {
    console.log('dbs:', alasql.databases)
  
    const dbName = 'shopperhopper'
  
    // attach an existing database
    await alasql.promise(`ATTACH INDEXEDDB DATABASE ${dbName}; use ${dbName};`)
  
    let x = await alasql.promise('select * from products')
    console.debug('products:', x)
  
    await alasql.promise('DROP TABLE IF EXISTS test;')
    await alasql.promise('create table test (id int, name string)')
    await alasql.promise('insert into test values (0, "yo")')
    x = await alasql.promise('select * from test')
    console.debug('test:', x)
  
    x = await alasql.promise('select * from products where id=?', 1)
    console.log('products by id:', x)

    await alasql.promise('drop table test')
}
*/

const dbName = 'shopperhopper'

class BaseTable {
  tableName: string | undefined

  constructor() {}

  async add(entity) {
    //const entityJson = JSON.stringify(entity)
    //const fields = Object.keys(entity)
    //const values = Object.values(entity)
    //const parameters = Array(fields.length).fill('?')

    const sql = `insert into ${this.tableName} values ?`
    //const sql = `select * INTO ${this.tableName} FROM ?`

    return await Database.run(sql, [entity])
  }

  async all() {
    return await Database.run(`select * from ${this.tableName}`)
  }

  async get(id) {
    let result = await Database.run(
      `select top 1 * from ${this.tableName} where id=?`,
      id
    )
    return result[0]
  }
}

class Products extends BaseTable {
  tableName = 'products'
}

class Stores extends BaseTable {
  tableName = 'stores'
}

class ShoppingList extends BaseTable {
  tableName = 'shoppingList'

  async allItems() {
    // select a join with product
    let sql = `select * from shoppingList inner join products \
                on shoppingList.productid = products.id`
    return Database.run(sql)
  }
}

class DataLayer {
  products: Products
  stores: Stores
  shoppingList: ShoppingList

  constructor() {
    this.products = new Products()
    this.stores = new Stores()
    this.shoppingList = new ShoppingList()
  }
}

class Database {
  static async setupDatabase() {
    // check if database exists. try to attach.
    await alasql.promise(`ATTACH INDEXEDDB DATABASE ${dbName};`)

    const database = alasql.databases[dbName]
    if (!database) {
      console.log(`creating database ${dbName}...`)
      await alasql.promise(`create database ${dbName};`)
    }

    //alasql.use(dbName)
    await alasql.promise(`use ${dbName};`)

    //const database = alasql.databases[dbName]
    //if (database.tables.length === 0) {
    //if (!alasql.tables.length) {
    let tableNames = Object.keys(database.tables)
    if (tableNames.length === 0) {
      await this.createTables()
    }
  }

  static async run(sql: string, parameters?: Array<any>) {
    await this.setupDatabase()

    console.debug('executing', sql)
    if (parameters) {
      console.log('with', parameters)
    }

    return await alasql.promise(sql, parameters)
  }

  static async createTables() {
    console.log('creating tables...')

    // Tables
    await alasql.promise(
      'CREATE TABLE IF NOT EXISTS stores (id int Primary Key, name string, description string);'
    )
    await alasql.promise(
      'CREATE TABLE IF NOT EXISTS products (id int PRIMARY KEY, name string, description string);'
    )
    await alasql.promise(
      'CREATE TABLE IF NOT EXISTS shoppingList (id int PRIMARY KEY, name string, description string);'
    )
  }

  static async drop() {
    await alasql.promise(`detach database ${dbName};`)
    return alasql.promise(`drop INDEXEDDB database ${dbName};`)
  }
}

export function useSqlDatabase() {
  //const db = new Database(alasql)
  const db = new DataLayer()

  return { db }
}
