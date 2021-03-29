const fs = require('fs')
const path = require('path')

const rootDir = require('../util/helper')
const p = path.join(rootDir, 'data', 'product.JSON')
const Cart = require('./cart')
const sql = require('../util/database')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {

  }

  static deleteProduct(id) {

  }

  static fetchAll() {
    return sql.execute("SELECT * FROM products")

  }

  static fetchById(id) {
  }
}
