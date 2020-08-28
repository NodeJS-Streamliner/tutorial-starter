const mongoDb = require('mongodb')
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const productId = req.params.productId
  Product.findById(productId)
    //Product.findByPk(productId)
    .then(product => {
      if (!product) return res.redirect('/')
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(error => {
      console.error(error)
    })
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDescription = req.body.description
  //const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
  //updatedProduct.save()
  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, productId)
  product.save()
    .then( result => {
      console.log('UPDATED PRODUCT ' + result)
      res.redirect('/admin/products')
    })
    .catch(error => {
      console.error(error)
    })

}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.deleteById(productId)
    .then(() => {
      console.log('Destroyed product')
      res.redirect('/admin/products')
    })
    .catch(error => {
      console.error(error)
    })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
         pageTitle: 'Admin Products',
         path:'/admin/products'
       })
     })
    .catch (error => {
      console.error(error)
    })
}
