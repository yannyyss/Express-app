const express = require('express')

// routes files:
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express() // Express is exported as a function

// Midleware express functions:

app.use(express.urlencoded({extended: false})) // This parse the url chunks for all middlewares

app.use(adminRoutes)
app.use(shopRoutes)

app.listen(3000) //It creates a server and listen to it