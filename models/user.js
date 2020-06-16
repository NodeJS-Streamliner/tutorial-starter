const getDb = require('../util/database').getDb
const mongoDb = require('mongodb')

const ObjectId = mongoDb.ObjectId

class User {
  constructor(username, email, cart, id) {
    this.name = username
    this.email = email
    this.cart = cart
    this._id = id
  }

  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    //const cartProduct = this.cart.items.findIndex(cartProduct => {
    //  return cartProduct._id = product._id
    //})
    const updatedCart = {items: [{...product, quantity: 1}]}
    const db = getDb()
    db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
  }

  static findById(userId) {
    const db = getDb()
    return db
      .collection('users')
      .findOne({_id: new ObjectId(userId)})
      .then(user => {
        console.log(user)
        return user
      })
      .catch(error => {
        console.error(error)
      })
  }
}

module.exports = User
