const express = require('express')
const path = require('path')
const routeDirectory = require('../utils/path')

const router = express.Router()

router.get('/',(req, res) => { // It will executed just when "/" match exactly because of the get (if we use "use", match with "/---whatever")
    res.sendFile(path.join(routeDirectory, 'views', 'shop.html')) // __dirname is a global variable whic hold the absolutely path 
})

module.exports = router