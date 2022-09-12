/**
 * Data model
 */

export class Store {
  id = null
  name

  constructor() {
    // this.id = undefined
    this.name = null
  }
}

export class Product {
  name
  description

  constructor() {
    this.name = undefined
    this.description = undefined
  }
}

export class ShoppingListItem {
  id
  productid: number | undefined

  constructor(productId: number) {
    this.id = Date.now()
    this.productid = productId
  }
}
