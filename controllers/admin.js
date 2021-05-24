const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit

  if (!editMode) {
    return res.redirect('/')
  }
  
  const { productId } = req.params

  req.user.getProducts({ where: {id: productId} })
    .then(products => {
      const product = products[0]
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: 'admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(e => console.log("Error",e))
    
}

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageURL, description, price } = req.body
  const updatedTitle = title
  const updatedImage = imageURL
  const updatedDescription = description
  const updatedPrice = price
  
  Product.findAll()
    .then(products => {
      const product = (products.find(prod => prod.id === Number(productId)))
      product.title = updatedTitle
      product.imageURL = updatedImage
      product.description = updatedDescription
      product.price = updatedPrice
      return product.save()
    })
    .then(() => {
      console.log("Product Updated")
      res.redirect('/admin/products')
    })
    .catch(e => console.log("Error",e))
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description} = req.body
  req.user.createProduct({
    title: title,
    price: price,
    imageURL: imageURL,
    description: description
  })
  .then(() => {
    console.log("Product Created")
    res.redirect('/admin/products')
  })
  .catch(e => console.log("Error",e))
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.findAll()
    .then(products => {
      const product = (products.find(prod => prod.id === Number(productId)))
      return product.destroy()
    })
    .then(() => {
      console.log("Product Destroyed")
      res.redirect('/admin/products')
    })
    .catch(e => console.log("Error",e))
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(e => console.log("Error",e))
}
