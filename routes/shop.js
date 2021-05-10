const express = require('express')
const adminData = require('./admin')

const router = express.Router()

router.get('/',(req, res) => { // It will executed just when "/" match exactly because of the get (if we use "use", match with "/---whatever")
    console.log('adminData', adminData.products)
    const products = adminData.products
    res.render('shop', {prods: products, docTitle: 'Shop'})
})

module.exports = router