const Sequelize = require('sequelize')
require('dotenv').config()
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env || {}
console.log(DB_NAME)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
})
// try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
// } catch (error) {
//     console.error('Unable to connect to the database:', error)
// }

module.exports = sequelize
