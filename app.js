const path = require('path')

const express = require('express')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')

// Models
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Middle where to have the user available anywhere
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user // store the sequelize user, with all the methods, like "destroy()", etc.
            next() // this allows to continue with the next middleware or function
        })
        .catch(e => console.log("Error",e))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// Sequelize Assosiations
Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem}) // Where this conections will be stored "CartItem" Model
Product.belongsToMany(Cart, { through: CartItem}) // Where this conections will be stored "CartItem" Model
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem})

sequelize
    // .sync({ force: true }) // Delete the previous tables at sequelize and create the new structure. You can use it once if the assosiations change, and then comment it. It deletes all the information.
    .sync()
    .then(() => {
        return User.findByPk(1) //this search for a user by Id
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'max@hotmail.com' })
        }
        return user
    })
    .then(user => {
        return user.createCart()
    })
    .then(cart => {
        app.listen(3000)
    })
    .catch(e => console.log("Error",e))
