const User = require('../models/User')

exports.isEmailExist = async (email) => {
    const existingUser = await User.findOne({ email })
    return existingUser !== null // Returns true if email exists
}