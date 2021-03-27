const Product = require('../model/product');
const Cart = require('../model/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
 Product.fetchById(prodId , product => {
   res.render('shop/product-detail',{
     product: product,
     pageTitle: 'Product',
     path: '/products'
   })
 })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products =>{
      const cartProducts = []
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if(cartProductData){
          cartProducts.push({productData: product , productQty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
    })
  }) 
  });
};

exports.postCart = (req , res ,next) =>{
  const productId = req.body.productId
  Product.fetchById(productId, (product)=> {
      Cart.addProduct(productId, product.price)
  })
  res.render('shop/cart',{
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
