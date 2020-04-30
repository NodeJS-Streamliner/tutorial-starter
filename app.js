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
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      next()
    }).catch(e => {
      console.error(e)
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// if user delete all related products to this user will be deleted too
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through:  OrderItem })

sequelize
  //.sync({force: true})  // drop table and re-create
   .sync() // create tables for your model when you called define method
  .then(result => {
    console.log('success connection to database')
    return User.findByPk(1)
  })
  .then(user => {
    if (!user){
      return User.create({
        name: 'Max',
        email: 'test@test.com'
      })
    }
    return Promise.resolve(user);
  })
  .then(user => {
    return user.createCart()
  })
  .then(cart => {
    console.log(cart)
    app.listen(3000)
  })
  .catch(e => {
    console.error(e)
  })
