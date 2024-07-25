module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Posts',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    })

    Like.associate = function (models) {
        Like.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        Like.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' })
    }

    return Like
}
