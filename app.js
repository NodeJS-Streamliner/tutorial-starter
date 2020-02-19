const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// if user delete all related products to this user will be deleted too
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})

User.hasMany(Product)

sequelize
  .sync({force: true}) // create tables for your model when you called define method
  .then(result => {
    console.log('success connection to database')

    app.listen(3000)
  })
  .catch(e => {
    console.error(e)
  })
