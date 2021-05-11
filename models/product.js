const products = []

module.exports = class Product {

    constructor(t) {
        this.title = t
    }

    save() {
        products.push(this)
    }

    static fetchAll() { // static is keyword to call the fetchAll function just in here, not like an instance
        return products
    }

}