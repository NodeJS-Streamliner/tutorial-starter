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


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

sequelize
  .sync() // create tables for your model when you called define method
  .then(result => {
    console.log('success connection to database')

    app.listen(3000)
  })
  .catch(e => {
    console.error(e)
  })
