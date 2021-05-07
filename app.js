const express = require('express')
const path = require('path')

// routes files:
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express() // Express is exported as a function

// Midleware express functions:

app.use(express.urlencoded({extended: false})) // This parse the url chunks for all middlewares
app.use(express.static(path.join(__dirname,'public'))) // We use static method to recognize the static files like css. We pass the path to grant access (public)

app.use('/admin',adminRoutes) // Now only this routes has /admin at the beginning
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views', '404.html'))
})
app.listen(3000) //It creates a server and listen to it