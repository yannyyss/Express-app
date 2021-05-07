const express = require('express')

const router = express.Router()

router.get('/add-product',(req, res, next) => { // we also can use "use" instead of get
    console.log('second middleware')
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
})

router.post('/product',(req, res, next) => { // we change use for post so now it works only for incoming post requests. Same way we can change use for get for incomming get requests
    console.log("req.body",req.body) //now this line only works with a POST method (that we use from our form). So when you enter by typing the url /product , the function is not gonna work. 
    res.redirect('/')
})

module.exports = router