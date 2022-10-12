const Sequelize = require('sequelize');
const database = require('../db');
const bcrypt = require('bcrypt')

const Usuario = database.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSaltSync(10, 'a')
            user.password = bcrypt.hashSync(user.password, salt)
        },
        beforeUpdate: async (user) => {
            const salt = await bcrypt.getSaltSync(10, 'a')
            user.password = bcrypt.hashSync(user.password, salt)
        }
    },
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password)
        }
    }
})
Usuario.prototype.validPassword = async (password, hash) => {
    result = await bcrypt.compareSync(password, hash);
    return result
}

module.exports = Usuario;
