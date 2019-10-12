const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render('page_not_found', {pageTitle: 'Page Not Found!'})
  //res.status(404).sendFile(path.join(__dirname, 'views', 'page_not_found.html'))
})

app.listen(3000)
