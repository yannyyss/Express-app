const fs = require('fs')
const path = require('path')

// Global helper constants

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json')

// Helper functions
const getProductsFromFile = callback => {
        
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callback([])
        }
        callback(JSON.parse(fileContent))
    })

}

module.exports = class Product {

    constructor(t) {
        this.title = t
    }

    save() {

        getProductsFromFile(products => {
            products.push(this)

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log("Error",err)
            })
        })

    }

    static fetchAll(callback) { // static is a keyword to call the fetchAll function just in here, not like an instance
        getProductsFromFile(callback)
    }

}