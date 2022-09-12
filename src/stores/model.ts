/**
 * Data model
 */

export class Store {
  id: number | undefined
  name: string
}

export class Product {
  id: number | undefined
  name: string
  description: string | undefined
}

export class ShoppingList {
  id: number | undefined
  name: string
  stores: Array<number>
}

export class ShoppingListItem {
  id: number | undefined
  productid: number | undefined

  constructor(productId: number) {
    // this.id = Date.now()
    this.productid = productId
  }
}
