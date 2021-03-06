
//const http = require('http')
const path = require('path')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
const mongoConnect = require('./util/database').mongoConnect
const adminRoutes = require('./routes/admin')
const shopRouter = require('./routes/shop')
const errorController = require('./controllers/error')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoutes)
app.use(shopRouter)

app.use(errorController.get404)

mongoConnect(()=>{
    app.listen(3000)
})