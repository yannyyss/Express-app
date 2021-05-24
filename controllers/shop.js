const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(e => console.log("Error",e))
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params
  Product.findAll({where: {id: productId}})
  .then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    })
  })
  .catch(e => {"Error",e})
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(e => console.log("Error",e))
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts =[]
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      })
    })
  })
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId, (prod) => {
    Cart.addProduct(productId, prod)
  })
  res.redirect('/cart')
}

exports.postCartDeleteItem = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
