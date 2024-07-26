const db = require('../models')
const Post = db.Post
const Like = db.Like

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body
        const post = await Post.create({ content, userId: req.userId })
        res.status(201).json({ post })
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: ['user', 'likes'], order: [['createdAt', 'DESC']] })
        res.json({ posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error retrieving posts' })
    }
}

exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;
        const existingLike = await Like.findOne({ where: { userId, postId } });
        if (existingLike) {
            await existingLike.destroy();
            res.status(200).json({ message: 'Like removed' });
        } else {
            const like = await Like.create({ userId, postId });
            res.status(201).json({ like });
        }
    } catch (error) {
        console.error('Error in liking/unliking post:', error);
        res.status(500).json({ error: 'Error liking/unliking post' });
    }
};
