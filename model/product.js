const fs = require('fs')
const path = require('path')
const rootDir = require('../util/helper')
const p = path.join(rootDir, 'data', 'product.JSON')

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Product {
    constructor(id ,title, imageUrl, description, price) {
      this.id = id
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.price = price;
    }
    save() { 
        getProductsFromFile(products => {
          if(this.id){
            const existingProductIndex = products.findIndex(prod=> prod.id === this.id)
            const updatedProduct = [...products]
            updatedProduct[existingProductIndex] = this
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
              console.log(err);
            });
          }
          else{
            this.id = Math.random().toString()
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
         
        });
      }

      static deleteProduct(id){
       getProductsFromFile(products => {
         const updatedProduct = products.filter(prod => prod.id !== id)
         console.log(updatedProduct)
          fs.writeFile(p,JSON.stringify(updatedProduct),err=>{
            if(!err){
              console.log('Success')
            }
          })
       })
      }
    
      static fetchAll(cb) {
        getProductsFromFile(cb);
      }

      static fetchById(id , cb){
        getProductsFromFile(products => {
          const product = products.find(p=> p.id === id)
          cb(product)
        })
      }
}
