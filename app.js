
const http = require('http')
const path = require('path')

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

const adminRoutes = require('./routes/admin')
const shopRouter = require('./routes/shop')
const errorController = require('./controllers/error')


app.use('/admin', adminRoutes)
app.use(shopRouter)

app.use(errorController.get404)

app.listen(3000)