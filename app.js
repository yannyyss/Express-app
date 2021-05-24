const path = require('path')

const express = require('express')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')

const Product = require('./models/product')
const User = require('./models/user')

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

//Relate the Product and Use Model

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' })
User.hasMany(Product)

sequelize
    // .sync({ force: true })
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
        // console.log("User",user)
        app.listen(3000)
    })
    .catch(e => console.log("Error",e))
