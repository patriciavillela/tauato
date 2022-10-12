const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuarios')
const Mensagem = require('./mensagens')

const Reacao = database.define('reacoes', {
	reacao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['massa', 'paia']]
        }
	},
    usuarioId: {
        type: Sequelize.STRING,
		primaryKey: true,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    mensagemId: {
        type: Sequelize.STRING,
		primaryKey: true,
        references: {
            model: Mensagem,
            key: 'id'
        },
        allowNull: false
    }
})

Mensagem.hasMany(Reacao, {
    foreignKey: 'mensagemId'
})
Usuario.hasMany(Reacao)

module.exports = Reacao;
