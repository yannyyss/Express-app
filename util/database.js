const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'YanMySQL4', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize
