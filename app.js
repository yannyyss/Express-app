const express = require('express')

const app = express() // Express is exported as a function

// Midleware express functions:

app.use((req, res, next) => {
    console.log('first middleware')
    next() // if we don't call it, the code stops in this middleware, but with next function we can continue to the next middleware
})

app.use((req, res, next) => {
    console.log('second middleware')
    res.send('<h1>Hello</h1>') // with express you don't need to declare res.setHeader(...), it takes html by default
})

app.listen(3000) //It creates a server and listen to it