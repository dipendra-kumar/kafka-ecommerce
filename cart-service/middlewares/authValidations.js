const validator = require("validator")
const constants = require("../helpers/constants")
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const validateRegister = async (req, res, next) => {
    console.log(req.body)
    const errors = [];

    const { userName, emailAddress, password, confirmPassword, phoneNumber } = req.body;

    if (!userName || !emailAddress || !password || !confirmPassword || !phoneNumber) {
        return res.status(400).json({ error: constants.FILL_ALL_FIELDS_MESSAGE })
    }

    const nameReg = /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})/
    if (!(nameReg.test(userName))) {
        errors.push(constants.INVALID_USER_NAME)
    }

    if (!validator.isEmail(emailAddress)) {
        errors.push(constants.NOT_A_VALID_EMAIL)
    }

    if (password !== confirmPassword) {
        errors.push(constants.PASSWORD_DO_NOT_MATCH)
    }

    const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const strongPassword = reg.test(password)

    if (!strongPassword) {
        errors.push(constants.NOT_A_VALID_PASSWORD)
    }

    const isPhoneNumber = /^\d{10}$/.test(phoneNumber)

    if (!isPhoneNumber) {
        errors.push(constants.NOT_A_VALID_PHONE_NUMBER)
    }

    if (errors.length >= 1) {
        return res.status(400).json(errors)
    }
    next();
}

const validateLogin = (req, res, next) => {
    const { emailAddress, password } = req.body;

    if (!emailAddress, !password) {
        return res.status(400).json({ error: constants.FILL_ALL_FIELDS_MESSAGE })
    }

    if (!validator.isEmail(emailAddress)) {
        return res.status(400).json({
            error: constants.NOT_A_VALID_EMAIL
        })
    }

    next();
}

const validateChangePassword = async (req, res, next) => {

    let { currentPassword, newPassword, confirmNewPassword } = req.body;
    const errors = [];
    try {
        const userInfo = await User.findOne(req.user._id)

        if (!userInfo) {
            errors.push(constants.USER_NOT_LOGGED_IN)
        }

        if (!bcrypt.compareSync(currentPassword, userInfo.password)) {
            errors.push(constants.INCORRECT_PASSWORD)
        }

        if (newPassword !== confirmNewPassword) {
            errors.push(constants.PASSWORD_DO_NOT_MATCH)
        }

        const isPassword = /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(newPassword)

        if (!isPassword) {
            errors.push(constants.NOT_A_VALID_PASSWORD)
        }

        if (errors.length >= 1) {
            return res.status(400).json(errors)
        }

        next();
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ err: "Something went wrong!" })
    }
}

module.exports = { validateRegister, validateLogin, validateChangePassword }