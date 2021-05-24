const Product = require('../models/product')

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
  req.user.getCart().then(cart => {
    return cart.getProducts()
  })
  .then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    })
  })
  .catch(e => e)
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  let fetchedCart
  let newQty = 1

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts({ where: {id: productId}})
    })
    .then(products => {
      let product

      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQty = oldQuantity + 1
        return product
      }
      return Product.findByPk(productId)
    })
    .then(prod => fetchedCart.addProduct(prod, { through: {quantity: newQty} }))
    .then(() => res.redirect('/cart'))
    .catch(e => console.log("Error",e))
  
}

exports.postCartDeleteItem = (req, res, next) => {
  const { productId } = req.body

  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: {id: productId} })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(() => res.redirect('/cart'))
    .catch(e => console.log("Error",e))
}

exports.postOrder = (req, res, next) => {
  let fetchedCart
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      req.user.createOrder()
        .then(order => order.addProducts(products.map(prod => {
          prod.orderItem = { quantity: prod.cartItem.quantity }
          return prod
        })))
        .catch(e => console.log("Error",e))
    })
    .then(() => {
      return fetchedCart.setProducts(null)
    })
    .then(() => {
      res.redirect('/orders')
    })
    .catch(e => console.log("Error",e))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
    .then(orders => {
      console.log("orders",orders)
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      })
    })
    .catch(e => console.log("Error",e))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
