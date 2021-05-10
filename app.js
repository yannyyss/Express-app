const express = require('express')
const path = require('path')

// routes files:
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express() // Express is exported as a function

// Render templating engines with express (A globan configuration value)
app.set('view engine', 'pug') // We are telling express we are gonna compile using pug
app.set('views','views') // Where to find the templates (the views directory)

// Midleware express functions:

app.use(express.urlencoded({extended: false})) // This parse the url chunks for all middlewares
app.use(express.static(path.join(__dirname,'public'))) // We use static method to recognize the static files like css. We pass the path to grant access (public)

app.use('/admin', adminData.routes) // Now only this routes has /admin at the beginning
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})
app.listen(3000) //It creates a server and listen to it
