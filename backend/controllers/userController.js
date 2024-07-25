const db = require('../models')
const User = db.User
const Follow = db.Follow

exports.followUser = async (req, res) => {
    try {
        const { userId } = req.params
        const follow = await Follow.create({
            followerId: req.userId,
            followingId: userId,
        })
        res.status(201).json({ follow })
    } catch (error) {
        res.status(500).json({ error: 'Error following user' })
    }
}

exports.getUsersWithFollowers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: User,
                    as: 'followers',
                    attributes: ['id', 'username', 'email'],
                    through: { attributes: [] },
                },
                {
                    model: User,
                    as: 'followings',
                    attributes: ['id', 'username', 'email'],
                    through: { attributes: [] },
                },
            ],
        })

        res.json({ users })
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users with followers' })
    }
}
