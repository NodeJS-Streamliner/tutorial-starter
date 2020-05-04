const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://streamliner:12345678aA@cluster0-zxjuk.mongodb.net/test?retryWrites=true&w=majority')
    .then(client =>  {
      console.log('connected')
      callback(client)
    })
    .catch(error => console.error(error))
}

module.exports = mongoConnect
