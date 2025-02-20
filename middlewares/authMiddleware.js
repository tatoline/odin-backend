const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

const protectRoute = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new AppError('Not authorized, token missing.', 401)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.userId }
        next()

    } catch (error) {
        console.error('JWT Verification Error:', error.message)
        res.status(401).json({ error: 'Session expired. Please log in again.' })
    }
}

module.exports = protectRoute