const express = require('express')
const path = require('path')
const rootDir = require('../util/path')
const adminData = require('./admin')
const router = express.Router()


router.get('/', (req, res, next) => {
  console.log('shop.js',adminData.products)
  const products = adminData.products
  res.render('shop', {prods: products, pageTitle: 'Shop', path:'/', hasProducts: products.length > 0})
  //return res.sendFile(path.join(rootDir,'views', 'shop.html'))
})

module.exports = router
