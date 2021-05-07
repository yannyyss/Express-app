const express = require('express')

const app = express() // Express is exported as a function

// Midleware express functions:

app.use(express.urlencoded({extended: false})) // This parse the url chunks for all middlewares

app.use('/',(req, res, next) => { // the first argument it receives is the path, by default is '/', but if you let this alone, could show the same response because it works for / and anything after
    console.log('this always runs because of the /')
    next() // if we don't call it, the code stops in this middleware, but with next function we can continue to the next middleware
})

app.use('/add-product',(req, res, next) => {
    console.log('second middleware')
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
})

app.post('/product',(req, res, next) => { // we change use for post so now it works only for incoming post requests. Same way we can change use for get for incomming get requests
    console.log("req.body",req.body) //now this line only works with a POST method (that we use from our form). So when you enter by typing the url /product , the function is not gonna work. 
    res.redirect('/')
})

app.use((req, res) => { // default is "/" and because is at the bottom, just excecuted when is the / url empty
    res.send('<h1>Hello</h1>')
})

app.listen(3000) //It creates a server and listen to it