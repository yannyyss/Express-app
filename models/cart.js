const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    
    static addProduct(id, product) {
        
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            
            let cart = { products: [], totalPrice: 0 }

            if (!err) {
                cart = JSON.parse(fileContent)
            }

            // Find existing product 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]

            let updatedProduct

            if (existingProduct) {

                // Update the product qty
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1

                // Update the existingProduct at cart products
                cart.products = [ ...cart.products ]
                cart.products[existingProductIndex] = updatedProduct

            } else {

                // Create the new product to add
                updatedProduct = { id: id, qty: 1}
                // Update the cart products adding the new one
                cart.products = [ ...cart.products, updatedProduct ]

            }

            // Update the cart totalPrice
            cart.totalPrice = cart.totalPrice + +product.price

            // Update the cart file
            fs.writeFile(p, JSON.stringify(cart), err => console.log("Error", err))

        })

    }

    static deleteProduct(id, product) {

        fs.readFile(p, (err, fileContent) =>{
            if (err) {
                return console.log("Error", err)
            }

            const updatedCart = {...JSON.parse(fileContent)}

            const cartProductQty = updatedCart.products.find(prod => prod.id === id)

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)

            updatedCart.totalPrice = updatedCart.totalPrice - (product.price * cartProductQty.qty)

            if (!updatedCart.totalPrice) {
                updatedCart.totalPrice = 0
            }

            // Update the cart file
            fs.writeFile(p, JSON.stringify(updatedCart), err => console.log("Error", err))
        })

    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
                return cb(null)
            }
            cb(cart)
        })
    }

}