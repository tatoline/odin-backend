const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected!')
    } catch (err) {
        console.error('MongoDB Connection Error:', err)
        process.exit(1) // Stop the server if DB fails to connect
    }
}

module.exports = connectDB