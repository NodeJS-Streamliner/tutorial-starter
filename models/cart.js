const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (error, fileContent) => {
      if(error) return
      let cart = { products: [], totalPrice: 0 }
      if (fileContent != null && fileContent != '') {
        cart = JSON.parse(fileContent)
      }
      // Analyze the cart => Find existings product
      const existingProductIndex = cart.products.findIndex(
        product => product.id === id
      )
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct;
      // Add new product/increase quantity
      if (existingProduct) {
        updatedProduct = {...existingProduct}
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1}
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + productPrice
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      } )
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (error, fileContent) => {
      if (error) return
      let cart = { products: [], totalPrice: 0 }
      if (fileContent != null && fileContent != '') {
        cart = JSON.parse(fileContent)
      }
      const updateCart = {...cart}
      const product = updateCart.products.find(product => product.id === id)
      if (product) {
        const productQty = product.qty
        updateCart.products = updateCart.products.filter(product => product.id !== id)
        updateCart.totalPrice -= productPrice * productQty
        fs.writeFile(p, JSON.stringify(updateCart), err => {
          console.log(err)
        })
      }
    })
  }

  static getCart(callback) {
    fs.readFile(p, (error, fileContent) => {
      if (error) return callback(error)
      let cart = { products: [], totalPrice: 0 }
      if (fileContent != null && fileContent != '') {
        cart = JSON.parse(fileContent)
      }
      callback(cart)
    })
  }
}
