module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    })

    Post.associate = function (models) {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        Post.hasMany(models.Like, { as: 'likes', foreignKey: 'postId' })
    }

    return Post
}
