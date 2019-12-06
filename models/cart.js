const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)
module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the prev
    fs.readFile(p, (error, fileContent) => {
      let cart = {products: [], totalPrice: 0}
      if(!error) {
        cart = JSON.parse(fileContent)
      }
      // Analyze the cart => Find existings product
      const existingProductIndex = cart.products.findIndex((product) => product.id === id)
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
}