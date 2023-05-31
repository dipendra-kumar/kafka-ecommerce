const consumeMessage = require("../../gateway/kafka/consumer");
const sendMessage = require("../../gateway/kafka/producer");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

const authService = async () => {
    try {
        await consumeMessage("tokenGroup", "tokenData", verifyUser)
    } catch (error) {
        console.log(error)
    }
}
authService();

async function verifyUser(token) {
    try {
        if (!token) return;
        console.log(token)
        token = token.toString();
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id })
        user.status = false;
        if (!user) {
            throw new Error;
        }
        await sendMessage("userData", user)

        return true;
    } catch (error) {
        const user = {}
        user.error = error
        user.status = false
        await sendMessage("userData", user)
    }

}