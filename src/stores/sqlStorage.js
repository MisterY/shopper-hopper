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

class Database {
  sql

  constructor(alasql) {
    this.sql = alasql
  }

  async #create() {
    console.log(`creating database ${dbName}...`)

    await alasql.promise(`create database ${dbName};`)

    // Tables
    await alasql.promise(`
  CREATE TABLE IF NOT EXISTS stores (id int, name string, description string);
  CREATE TABLE IF NOT EXISTS products (id int, name string, description string);
  CREATE TABLE IF NOT EXISTS shoppingList (id int, name string, description string);
  `)
  }

  async #attach() {
    // check if database exists.
    await alasql.promise(`ATTACH INDEXEDDB DATABASE ${dbName};`)
    const database = alasql.databases[dbName]
    if (!database) {
      await this.#create()
    }

    await alasql.promise(`use ${dbName};`)
  }

  async run(sql) {
    await this.#attach()

    return await this.sql.promise(sql)
  }

  async drop() {
    await this.sql.promise(`detach database ${dbName};`)
    return this.sql.promise(`drop INDEXEDDB database ${dbName};`)
  }
}

export function useSqlDatabase() {
  const db = new Database(alasql)

  return { db }
}
