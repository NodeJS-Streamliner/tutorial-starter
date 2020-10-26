 const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products)
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
  Product.findById(productId)
  .then(product => {
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
  Product.find()
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
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
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
  Product.findById(productId).then(product => {
    return req.user.addToCart(product)
  }).then(result => {
    console.log(result)
    res.redirect('/cart')
  })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  req.user
    .deleteItemFromCart(productId)
    .then(result => {
      res.redirect('/cart')
    }).catch(error => console.error(error))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      })
    })
    .catch(error => {
      console.error(error)
    })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

exports.postOrder = (req, res, next) => {
   req.user
   .addOrder()
   .then(result => {
     res.redirect('/orders ')
   })
   .catch(error => console.error(error))
}
