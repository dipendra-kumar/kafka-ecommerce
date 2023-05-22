const jwt = require('jsonwebtoken')
const User = require('../models/user')
const constants = require("../helpers/constants")
const consumer = require('../../gateway/kafka/consumer.js')

const auth = async (req, res, next) => {
    await consumer.subscribe({ topic: "userData" })
    await consumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: ({ message }) => {
            // here, we just log the message to the standard output
            console.log(`received message: ${message.value}`)
        },
    })

    // try {
    //     console.log(req.body)
    //     const token = req.header('Authorization').replace('Bearer ', '')
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    //     if (!user && !admin) {
    //         throw new Error
    //     }
    //     req.token = token
    //     req.user = user
    //     next()
    // } catch (error) {
    //     res.status(401).json({ error: constants.USER_NOT_LOGGED_IN })
    //
    // }
}

module.exports = auth