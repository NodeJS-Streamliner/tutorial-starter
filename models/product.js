const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
  }, 
  imageUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)

/*const mongoDb = require('mongodb')
const getDb = require('../util/database').getDb

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation
    if (this._id) {
      // Update product
      dbOperation = db.collection('products')
        .updateOne({_id : this._id}, {$set: this})
    } else {
      // Insert product
      dbOperation = db.collection('products').insertOne(this)
    }

    return dbOperation
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb()
    return db
    .collection('products')
    .find()
    .toArray()
    .then(products => {
      console.log(products)
      return products
    })
    .catch(error => {
      console.error(error)
    })
  }

  static findById(id) {
    const db = getDb()
    return db
      .collection('products')
      .find({_id : new mongoDb.ObjectId(id)})
      .next()
      .then(product => {
        console.log(product)
        return product
      })
      .catch(error => {
        console.error(error)
      })
  }

  static deleteById(id) {
    const db = getDb()
    return db
      .collection('products')
      .deleteOne({_id: new mongoDb.ObjectId(id)})
      .then(result => {
        console.log('deleted')
      })
      .catch(error => {
        console.error(error)
      })
  }
}

module.exports = Product;*/
