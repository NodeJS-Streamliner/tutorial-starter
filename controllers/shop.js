 const Product = require('../models/product')
 const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
         pageTitle: 'All Products',
         path:'/products',
         hasProducts: products.length > 0,
         activeShop: true,
         productCSS: true
       })
    })
    .catch(e => {
      console.error(e)
    })
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  /*Product.findAll({where: {id: productId}})
    .then(products => {
      console.log('products = ' + products)
    })
    .catch(error => {
      console.error(error)
    })*/
  // TODO: this code maybe run twice and the second time with product = null.
  Product.findByPk(productId)
  .then(product => {
    console.log('function getProduct = ' + product)
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  }).catch(error => {
    console.log(error)
  })
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
         pageTitle: 'Shop',
         path:'/'
       })
    })
    .catch(e => {
      console.error(e)
    })
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
                .then(products => {
                  res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: products
                  })
                }).catch(error => console.error(error))
    })
    .catch(err => console.error(err))
  /*Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      })
    })
  })*/
}

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, parseFloat(product.price))
  })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
