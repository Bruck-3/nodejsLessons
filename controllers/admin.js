const Product = require("../model/product");


exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    edit: false,
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll().then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
  })
  })
}


exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);
  product.save().then((result) => {
   console.log(result)
    res.redirect("/");
  })
};

// exports.getEditProduct = (req , res) => {
//   const editMode = req.query.edit
//   console.log(editMode)
//   const productId = req.params.productId
//   if(!editMode){
//     return res.redirect('/')
//   }

//   Product.findAll({
//     where:
//     {
//     id: productId
//     }
//   })
//   .then(products => {
//     res.render('admin/edit-product', {
//       prod: products[0],
//       path: '/admin/edit-product',
//       pageTitle: 'Edit Product',
//       edit: editMode
//     })
//   })
//   .catch(err => console.log(err))
// }
// exports.postEditProduct = (req,res) =>{
//   const updatedId = req.body.productId
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;
//   Product.update({
//     title: updatedTitle,
//     imageUrl: updatedImageUrl,
//     price: updatedPrice,
//     description: updatedDescription
//     },
//     { where: {
//       id:updatedId
//       }
//     })
//     .then(()=>{
//     res.redirect('/admin/products')
//   })
//   .catch(err => console.log(err))
// }

// exports.deleteProduct = (req,res) =>{
//   const productId = req.body.productId
//   Product.destroy(
//     {
//      where:{
//       id: productId
//            }
//     }).then(()=>{
//       res.redirect('/admin/products')
//     })
//     .catch(err => console.log(err))
// }

