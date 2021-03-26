const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    edit: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req , res, next) => {
  const editMode = req.query.edit
  console.log(editMode)
  const productId = req.params.productId
  if(!editMode){
    return res.redirect('/')
  }
  Product.fetchById(productId, product =>{
    res.render('admin/edit-product', {
      prod: product,
      path: '/admin/edit-product',
      pageTitle: 'Edit Product',
      edit: editMode
    })
  })
}


exports.postEditProduct = (req,res,next) =>{
  const updatedId = req.body.productId
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(updatedId ,updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect('/')
}

exports.deleteProduct = (req,res,next) =>{
  const productId = req.body.productId
  Product.deleteProduct(productId);
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}


