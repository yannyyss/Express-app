const express = require('express')

const router = express.Router()

router.get('/',(req, res) => { // It will executed just when "/" match exactly because of the get (if we use "use", match with "/---whatever")
    res.send('<h1>Hello</h1>')
})

module.exports = router