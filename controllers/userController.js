const userService = require('../services/userService')
const { validationResult } = require('express-validator')

exports.checkEmailExistence = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ error: 'Email is required' })
        }

        const isExist = await userService.isEmailExist(email)
        res.status(200).json({ isExist })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body)
  
        res.status(201).json({ message: 'User created successfully.', user: newUser })
    } catch (error) {
        console.error('User creation error:', error.message)
      
        res.status(error.statusCode || 500).json({ error: error.message })
    }
  }