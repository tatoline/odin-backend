const User = require('../models/User')
const AppError = require('../utils/AppError')

exports.isEmailExist = async (email) => {
    const existingUser = await User.findOne({ email })
    return existingUser !== null // Returns true if email exists
}

exports.createUser = async ({ name, surname, email, country, gender, birthday, password }) => {
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new AppError('Email already in use.', 400) // Service detects duplicate email
        }
  
        const newUser = new User({ name, surname, email, country, gender, birthday, password })
        return await newUser.save()
    } catch (error) {
        console.error('Error in userService.createUser:', error.message)
      
        if (error instanceof AppError) {
            throw error // Forward expected errors
        }
      
        throw new AppError('An unexpected error occurred.', 500) // Convert unknown errors
    }
}