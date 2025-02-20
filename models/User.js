const mongoose = require('mongoose')
const BaseSchema = require('./BaseSchema')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: Date, required: true },
    theme: { 
        type: String, 
        enum: ['dark', 'light'], // Restrict values to only 'dark' or 'light' since only two themes available
        default: 'dark'
    },
    refreshToken: { type: String, default: null } // Stores refresh token for authentication
})

// Extend the base schema (adds deletedAt & deletedBy)
userSchema.add(BaseSchema)

module.exports = mongoose.model('User', userSchema)