const Sequelize = require('sequelize');
const database = require('../db');

const Produto = database.define('mensagem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    texto: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Produto;
