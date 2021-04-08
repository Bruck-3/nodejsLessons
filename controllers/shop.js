const Product = require('../model/product');
// const Cart = require('../model/cart')

exports.getIndex = (req, res) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(error => {
    console.log(error)
  })
};

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(error => {
      console.log(error)
    })
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId
  Product.fetchById(prodId)
  .then(product => {
    res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
    })
  })
  .catch(err => console.log(err))
}


// exports.getCart = (req, res) => {
//   Cart.getCart(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = []
//       for (let product of products) {
//         const cartProductData = cart.products.find(prod => prod.id === product.id)
//         if (cartProductData) {
//           cartProducts.push({ productData: product, productQty: cartProductData.qty })
//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//       })
//     })
//   });
// };

// exports.postCart = (req, res) => {
//   const productId = req.body.productId
//   Product.fetchById(productId, (product) => {
//     Cart.addProduct(productId, product.price)
//   })
//   res.render('shop/cart', {
//     path: '/cart',
//     pageTitle: 'Your Cart'
//   })
// }

// exports.deleteItemFromCart = (req, res) => {
//   const productId = req.body.productId
//   Product.fetchById(productId, product => {
//     Cart.deleteProductFromCart(productId, product.price)
//     res.render('shop/cart', {
//       path: '/cart',
//       pageTitle: 'Your Cart'
//     })
//   })
// }


// exports.getOrders = (req, res) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

// exports.getCheckout = (req, res) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// }
