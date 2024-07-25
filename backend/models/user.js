const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10)
    })

    User.prototype.validatePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get())
        delete values.password
        return values
    }

    User.isExist = async function ({ username, email }) {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: email }],
            },
        })
        if (user) {
            return {
                error: 'Username or Email already exists',
            }
        }
        return null
    }
    return User
}
