const mongoObjectId = require('mongodb').ObjectID
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
  static fetchAll(){
    const db =getDb()
     return db.collection('products')
    .find()
    .toArray()
    .then(products => {return products})
    .catch(err => console.log(err))
  }
  static fetchById(prodId){
    const db = getDb()
    return db.collection('products')
    .find({ _id: mongoObjectId(prodId) })
    .next()
    .then(product => {
      return product
    })
    .catch(err => console.log(err))
  }
}

module.exports = Product