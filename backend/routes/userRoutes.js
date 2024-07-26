const express = require('express')
const userController = require('../controllers/userController')
const { authenticate } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/me', authenticate, userController.getUser)
router.post('/getUserById', authenticate, userController.getUserById)
router.post('/:userId/follow', authenticate, userController.followUser)
router.post(
    '/getUsersWithFollowers',
    authenticate,
    userController.getUsersWithFollowers
)

module.exports = router
