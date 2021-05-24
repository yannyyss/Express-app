const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

// :productId is a dynamic segment, so, it's better to put at the bottom of the matchin routes to avoid the coincidence of /products/anything
router.get('/products/:productId', shopController.getProduct)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.post('/cart-delete-item', shopController.postCartDeleteItem)

router.post('/create-order', shopController.postOrder)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckout)

module.exports = router
