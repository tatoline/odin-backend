const userService = require('../services/userService')

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