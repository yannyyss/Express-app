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

  Product.findById(productId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })

}

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageURL, description, price } = req.body
  const updatedTitle = title
  const updatedImage = imageURL
  const updatedDescription = description
  const updatedPrice = price
  const updatedProduct = new Product(productId, updatedTitle, updatedImage, updatedDescription, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description} = req.body
  const product = new Product(null, title, imageURL, description, price)
  product.save()
  res.redirect('/')
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.deleteById(productId)
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
}
