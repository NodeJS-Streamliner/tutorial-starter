const Sequelize = require('requelize')

const sequelize = new Sequelize('node-complete', 'root', '12345678', {dialect: 'mysql', host : 'localhost'})

module.exports = sequelize
