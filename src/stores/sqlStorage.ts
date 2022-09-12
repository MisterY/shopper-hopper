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
  db: Database

  constructor() {
    this.db = new Database()
  }

  async add(entity) {
    //const entityJson = JSON.stringify(entity)
    //const fields = Object.keys(entity)
    //const values = Object.values(entity)
    //const parameters = Array(fields.length).fill('?')

    const sql = `insert into ${this.tableName} values ?`

    return await this.db.run(sql, [entity])
  }

  async all() {
    return await this.db.run(`select * from ${this.tableName}`)
  }

  async get(id) {
    let result = await this.db.run(
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
}

class DataLayer {
  products
  stores
  shoppingList

  constructor() {
    this.products = new Products()
    this.stores = new Stores()
    this.shoppingList = new ShoppingList()
  }
}

class Database {
  constructor() {}

  async run(sql: string, parameters?: Array<any>) {
    await this.attachDatabase()

    // if (parameters && typeof parameters !== 'array') {
    //   console.warn('Not an array!', parameters)
    //   parameters = [parameters]
    // }

    console.debug('executing', sql, 'with', parameters)

    return await alasql.promise(sql, parameters)
  }

  async createDatabase() {
    console.log(`creating database ${dbName}...`)

    await alasql.promise(`create database ${dbName};`)

    await this.createTables()
  }

  async attachDatabase() {
    // check if database exists.
    await alasql.promise(`ATTACH INDEXEDDB DATABASE ${dbName};`)
    const database = alasql.databases[dbName]
    if (!database) {
      await this.createDatabase()
    }
    if (database.tables.length === 0) {
      this.createTables()
    }

    await alasql.promise(`use ${dbName};`)
  }

  async createTables() {
    // Tables
    await alasql.promise(`
    CREATE TABLE IF NOT EXISTS stores (id int, name string, description string);
    CREATE TABLE IF NOT EXISTS products (id int, name string, description string);
    CREATE TABLE IF NOT EXISTS shoppingList (id int, name string, description string);
    `)
  }

  async drop() {
    await alasql.promise(`detach database ${dbName};`)
    return alasql.promise(`drop INDEXEDDB database ${dbName};`)
  }
}

export function useSqlDatabase() {
  //const db = new Database(alasql)
  const db = new DataLayer()

  return { db }
}
