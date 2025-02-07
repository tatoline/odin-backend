const User = require('../models/User')
const AppError = require('../utils/AppError')
const bcrypt = require('bcrypt')

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

        if (!password) {
            throw new AppError('Password is required.', 400) // Double-check if password is missing
        }

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10) // 10 = salt rounds
  
        const newUser = new User({ name, surname, email, country, gender, birthday, password: hashedPassword })
        return await newUser.save()
        
    } catch (error) {
        console.error('Error in userService.createUser:', error.message)
      
        if (error instanceof AppError) {
            throw error // Forward expected errors
        }
      
        throw new AppError('An unexpected error occurred.', 500)
    }
}

exports.login = async(email, password) => {
    try {
        const loggedUser = await User.findOne({ email })

        if (!loggedUser) {
            throw new AppError('Invalid email or password.', 401)
        }
        
        const isMatch = await bcrypt.compare(password, loggedUser.password)
        if (!isMatch) {
            throw new AppError('Invalid email or password.', 401)
        }
        
        return loggedUser

    } catch (error) {
        console.error('Error in userService.login:', error.message)
        
        if (error instanceof AppError) {
            throw error // Send expected errors (e.g., "Invalid email or password") to frontend
        }

        throw new AppError('An unexpected error occurred.', 500) // Hide internal errors

    }
}