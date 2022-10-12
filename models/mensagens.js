const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuarios')

const Mensagem = database.define('mensagens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    texto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usuarioId: {
        type: Sequelize.STRING,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    marcadorDeTom: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['genuino', 'piada', 'ironia']]
        }
    }
})

Usuario.hasMany(Mensagem)

module.exports = Mensagem;
