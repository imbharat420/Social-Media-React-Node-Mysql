const express = require('express')
var morgan = require('morgan')
var cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
const db = require('./models')

const app = express()

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use((req, res, next) => {
    console.log(req.body)
    next()
})
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

// if we restart on force:true -- it will drop all tables and recreate
db.sequelize.sync({ force: false, logging: false }).then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000')
    })
})
