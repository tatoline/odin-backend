const jwt = require('jsonwebtoken')

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken }