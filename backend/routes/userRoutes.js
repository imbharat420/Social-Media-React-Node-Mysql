const express = require('express')
const userController = require('../controllers/userController')
const { authenticate } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/:userId/follow', authenticate, userController.followUser)
router.post(
    '/getUsersWithFollowers',
    authenticate,
    userController.getUsersWithFollowers
)

module.exports = router
