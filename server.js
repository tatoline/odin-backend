require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

// Middleware
app.use(express.json())

// Enable CORS (Allow frontend requests)
app.use(cors({
    origin: 'http://localhost:3000', // It should match with frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// Connect to MongoDB
connectDB()

// Routes
app.use(`${process.env.API_VERSION}/user`, require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))