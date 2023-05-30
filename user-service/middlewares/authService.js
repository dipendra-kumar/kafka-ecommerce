const consumeMessage = require("../../gateway/kafka/consumer");
const sendMessage = require("../../gateway/kafka/producer");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

const authService = async () => {
    try {
        const token = await consumeMessage("tokenGroup", "tokenData")
        console.log(token)
        await verifyUser(token)
    } catch (error) {
        console.log(error)
    }
}
authService();

async function verifyUser(token) {
    try {
        token = token.toString();
        console.log(token, "kjd;flkjdf;gkljsdf;gkljsd;flkgjsdf;lgkjsd;gkljsd;flgkjs;dfgklj;");
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id })
        if (!user) {
            throw new Error;
        }
        await sendMessage("userData", user)
        return true;
    } catch (error) {
        console.log(error)
        await sendMessage("userData", error)
    }

}