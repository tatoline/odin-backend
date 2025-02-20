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
        const { email, password, rememberMe } = req.body

        // userService removes the password before sending response
        const { loggedUserWithoutPassword, accessToken, refreshToken } = await userService.login({ email, password, rememberMe })

        if (refreshToken) {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // Prevents XSS attacks
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
            })
        }

        res.status(200).json({loggedUserWithoutPassword, accessToken}) // Send user & access token

    } catch(error) {
        console.error('User login error:', error.message)
      
        res.status(error.statusCode || 500).json({ error: error.message })
    }
}


exports.refreshAccessToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken
        if (!oldRefreshToken) {
            return res.status(401).json({ error: 'No refresh token provided.' })
        }

        // Find user by refresh token
        const user = await User.findOne({ refreshToken: oldRefreshToken })
        if (!user) {
            return res.status(401).json({ error: 'Invalid refresh token.' })
        }

        // Verify the refresh token
        jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid refresh token.' })
            }

            // Generate new tokens
            const newAccessToken = generateAccessToken(decoded.userId)
            const newRefreshToken = generateRefreshToken(decoded.userId)

            // Update refresh token in DB
            user.refreshToken = newRefreshToken
            await user.save()

            // Set new refresh token in HTTP-Only cookie
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
            })

            res.status(200).json({ accessToken: newAccessToken })
        })

    } catch (error) {
        console.error('Error refreshing access token:', error.message)
        res.status(500).json({ error: 'An unexpected error occurred.' })
    }
}
