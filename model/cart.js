const fs = require('fs')
const path = require('path')
const rootDir = require('../util/helper')
const p = path.join(rootDir, 'data', 'cart.JSON')

module.exports = class Cart {
    static addProduct(id, productPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cart = {products:[], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent)
            }
            //Find Out if there's existing Product
            const existingProductIndex = cart.products.findIndex(prod=> prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.qty += 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }
            else {
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products , updatedProduct]
            }
            cart.totalPrice = cart.totalPrice+ + productPrice
            fs.writeFile(p, JSON.stringify(cart), err =>{
                if(err){
                    console.log(err)
                }
               
            })
        })
    }
    static deleteProductFromCart(id, productPrice){
        fs.readFile(p,(error ,fileContent)=>{
            if (error) {
                return
            }
            const updatedProduct = {...JSON.parse(fileContent)}
            const product = updatedProduct.products.find(prod => prod.id === id)
            if(!product){
                return
            }
            const productQty = product.qty
            updatedProduct.products = updatedProduct.products.filter(prods => prods.id !== id)
            updatedProduct.totalPrice -= (productQty * productPrice)
            fs.writeFile(p,JSON.stringify(updatedProduct),error =>{
                if(error){
                    console.log(error)
                }
            })
        })
    }
}