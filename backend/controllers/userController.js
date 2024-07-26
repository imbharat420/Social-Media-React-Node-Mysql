const db = require('../models')
const User = db.User
const Follow = db.Follow

exports.followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.userId;

        const existingFollow = await Follow.findOne({
            where: {
                followerId,
                followingId: userId,
            },
        });

        if (existingFollow) {
            return res.status(400).json({ msg: 'You are already following this user' });
        }
        const follow = await Follow.create({
            followerId,
            followingId: userId,
        });

        res.status(201).json({ follow });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ msg: 'Error following user' });
    }
};


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
        res.status(500).json({ msg: 'Error retrieving users with followers' })
    }
}



exports.getUserById = async (req, res) => {
    try {
        const { id } = req.body; // Use req.params to get the ID from the route parameters


        const user = await User.findByPk(id, {
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
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ data: { user, msg: "Profile Retrieved Successfully" } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error retrieving profile" });
    }
};



exports.getUser = async (req, res) => {
    try {
        const userId = req.userId; // Get the user ID from the request object (authenticated user)

        // Fetch the current user with followers and followings
        const user = await User.findByPk(userId, {
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
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ data: { user }, msg: "Profile Retrieved Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error retrieving profile" });
    }
};
