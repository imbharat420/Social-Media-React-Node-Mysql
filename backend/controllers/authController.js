const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.User

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const exist = await User.isExist({ username, email })
        if (exist) {
            return res.status(400).json({ error: exist.error })
        }

        const user = await User.create({
            username,
            email,
            password,
        })
        res.status(201).json({ user })
    } catch (error) {
        res.status(500).json({ data: { msg: 'Error registering user' } })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log({ email, password })
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({ msg: 'Email is not registered' })
        }

        if (!user.validatePassword(password)) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        return res.json({ data: { token, user }, msg: 'Login Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: { msg: 'Error logging in' } })
    }
}
