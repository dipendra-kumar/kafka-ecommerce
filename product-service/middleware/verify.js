const jwt = require("jsonwebtoken");

const sendMessage = require("../../gateway/kafka/producer");
const consumeMessage = require("../../gateway/kafka/consumer");


const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    try {

        await sendMessage("tokenData", token)
        console.log(token)
        console.log("token sent to user-service")

        const data = await consumeMessage("userGroup", "userData")
        console.log(data, ";lksdjf;laksdjf;aklj")
        next();
    } catch (error) {
        console.log(error)
        // res.status(500).json({ error: "Something went wrong!" })

    }
}

module.exports = verifyUser;