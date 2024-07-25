const Sequelize = require('sequelize')
const sequelize = require('../configs/db.js')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Models
db.User = require('./user')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize)
db.Like = require('./like')(sequelize, Sequelize)
db.Follow = require('./follow')(sequelize, Sequelize)

// Associations
db.User.hasMany(db.Post, { as: 'posts', foreignKey: 'userId' })
db.Post.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
})

db.Like.belongsTo(db.Post, { foreignKey: 'postId', as: 'post' })
db.Post.hasMany(db.Like, { as: 'likes', foreignKey: 'postId' })

db.User.hasMany(db.Like, { as: 'likes', foreignKey: 'userId' })
db.Like.belongsTo(db.User, { foreignKey: 'userId', as: 'user' })

db.User.belongsToMany(db.User, {
    as: 'followers',
    through: db.Follow,
    foreignKey: 'followingId',
    otherKey: 'followerId',
})

db.User.belongsToMany(db.User, {
    as: 'followings',
    through: db.Follow,
    foreignKey: 'followerId',
    otherKey: 'followingId',
})

module.exports = db
