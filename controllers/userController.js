const userService = require('../services/userService')
const { validationResult } = require('express-validator')

exports.checkEmailExistence = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' })
        }

        const isExist = await userService.isEmailExist(email)
        res.status(200).json({ isExist })

    } catch (error) {
        console.error('User e-mail existence check error:', error.message)

        res.status(error.statusCode || 500).json({ error: error.message })
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

exports.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { email, password } = req.body
        const loggedUser = await userService.login(email, password)

        // Remove password before sending response
        const { password: _, ...userWithoutPassword } = loggedUser.toObject()

        res.status(200).json(userWithoutPassword)

    } catch(error) {
        console.error('User login error:', error.message)
      
        res.status(error.statusCode || 500).json({ error: error.message })
    }
}