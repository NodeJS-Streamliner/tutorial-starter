const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const User = require('./models/user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById("5f9838ec4d747957e4a1aa9b")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id)
      next()
    })
    .catch(error => {
      console.error(error)
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose.connect('mongodb+srv://streamliner:12345678aA@cluster0-zxjuk.mongodb.net/test?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        })
        user.save()
      }
    })
    app.listen(3000)
  })
  .catch(err => {
    console.error(err)
  })
