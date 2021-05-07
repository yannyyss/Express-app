const express = require('express')
const path = require('path')
const routeDirectory = require('../utils/path')

const router = express.Router()

// the same path can be use if the method is different:
router.get('/add-product',(req, res, next) => { // we also can use "use" instead of get
    console.log('second middleware')
    res.sendFile(path.join(routeDirectory,'views','add-product.html'))
})

router.post('/add-product',(req, res, next) => { // we change use for post so now it works only for incoming post requests. Same way we can change use for get for incomming get requests
    console.log("req.body",req.body) //now this line only works with a POST method (that we use from our form). So when you enter by typing the url /product , the function is not gonna work. 
    res.redirect('/')
})

module.exports = router