const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id
    this.title = title
    this.imageURL = imageURL
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {

      // If the product exists, update it
      if (this.id) { 
        const exisitingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[exisitingProductIndex] = this // this is the updated product
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err)
        })
      } else {
        // Create a new product instead
        this.id = Math.floor(Math.random() * 10000000).toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err)
        })
      }

    })
  }

  static deleteById(id){
    getProductsFromFile(products => {

      const product = products.find(prod => prod.id === id)

      const updatedProducts = products.filter(prod => prod.id !== id)

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err)
        if (!err) {
          Cart.deleteProduct(id, product)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(pd => pd.id === id)
      cb(product)
    })
  }
}
