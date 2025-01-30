const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: Date, required: true }
})

// Extend the base schema (adds deletedAt & deletedBy)
userSchema.add(BaseSchema)

module.exports = mongoose.model('User', userSchema)