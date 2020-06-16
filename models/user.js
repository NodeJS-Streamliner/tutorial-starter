const getDb = require('../util/database').getDb
const mongoDb = require('mongodb')

const ObjectId = mongoDb.ObjectId

class User {
  constructor(username, email) {
    this.name = username
    this.email = email
  }

  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
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
