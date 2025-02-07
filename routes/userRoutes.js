const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const { body, validationResult } = require('express-validator')

router.post('/isEmailExist', userController.checkEmailExistence)

router.post('/createUser', 
    [
        body('name').notEmpty().withMessage('Name is required.'),
        body('surname').notEmpty().withMessage('Surname is required.'),
        body('email').isEmail().withMessage('Valid email is required.'),
        body('country').notEmpty().withMessage('Country is required.'),
        body('gender').notEmpty().withMessage('Gender is required.'),
        body('birthday').notEmpty().withMessage('Birthday is required.'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    ],
    userController.createUser
)

router.post('/login',
    [
        body('email').isEmail().withMessage('Enter a valid e-mail.'),
        body('password')
            .notEmpty().withMessage('Enter your password.')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
     ],
     userController.login
)

module.exports = router