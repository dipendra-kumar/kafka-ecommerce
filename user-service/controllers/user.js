const User = require('../models/user')
const bcrypt = require('bcryptjs')
const constants = require("../helpers/constants")
const producer = require('../../gateway/kafka/producer')
const consumer = require('../../gateway/kafka/consumer.js')

const signup = async (req, res) => {

    // await consumer.subscribe({ topic: "tokenData" })
    // console.log('sdkljfa;skld')
    // await consumer.run({
    //     // this function is called every time the consumer gets a new message
    //     eachMessage: ({ message }) => {
    //         // here, we just log the message to the standard output
    //         console.log(`received message: ${message.value}`)


    //     },
    // })

    try {
        const userExists = await User.findOne({ emailAddress: req.body.emailAddress })

        if (userExists) {
            return res.status(400).json({
                error: constants.USER_ALREADY_EXISTS
            })
        }
        const newUser = new User(req.body)
        await newUser.save()
        const token = await newUser.generateAuthToken()
        return res.status(201).json({ newUser, token })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
    }

}

const login = async (req, res) => {
    const { emailAddress, password } = req.body

    try {
        const user = await User.findOne({ emailAddress })
        if (!user) {
            return res.status(400).json({ error: constants.USER_DOES_NOT_EXIST })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).send({ error: constants.INCORRECT_PASSWORD })
        }
        const token = await user.generateAuthToken()
        return res.status(200).json({ user, token })

    } catch (err) {
        return res.status(500).json({ error: constants.SOMETHING_WENT_WRONG });
    }
}

const changePassword = async (req, res) => {

    try {
        const user = await User.findOne(req.user._id)
        let { newPassword } = req.body
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, salt);
        user.password = newPassword;
        await User.findByIdAndUpdate(user._id, user)
        return res.status(200).json({ message: constants.PASSWORD_CHANGED_SUCCESSFULLY })
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
}

const getUser = async (req, res) => {

    try {
        const user = req.user;
        console.log(req.user)
        await producer.send({
            topic: 'userData',
            messages: [
                { value: JSON.stringify(user) },
            ],
        });
        // Disconnect the producer once we’re done

        await producer.disconnect();
        return res.status(200).send("Sent sucessfully")

    } catch (error) {
        console.log(error)
        return res.status(500).send(constants.SOMETHING_WENT_WRONG)
    }
}

const logout = async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        return res.status(200).json({ message: constants.LOGGED_OUT_SUCCESSFULLY })
    }

    catch (error) {
        return res.status(500).json({ error: constants.SOMETHING_WENT_WRONG })
    }
}

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).json({ message: constants.LOGGED_OUT_ALL })
    }

    catch (error) {
        res.status(500).json({ message: constants.SOMETHING_WENT_WRONG })
    }
}

module.exports = { signup, login, changePassword, getUser, logout, logoutAll }