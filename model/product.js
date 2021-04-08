const getDb = require('../util/database').getDatabase

const Product = class {
  constructor(title,imageUrl,price,description){
    this.title = title
    this.price = price
    this.imageUrl = imageUrl
    this.description = description
  }
  save(){
    const db = getDb()
    return  db.collection('products').insertOne(this).then(result => {
      console.log(result)
    }).catch(
      err => {
        throw err
      }
    )
  }
}

module.exports = Product