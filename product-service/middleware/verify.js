const jwt = require("jsonwebtoken");

const sendMessage = require("../../gateway/kafka/producer");
const consumeMessage = require("../../gateway/kafka/consumer");

const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        await sendMessage("tokenData", token)
        await consumeMessage("userGroup", "userData", getVal)
        function getVal(value) {
            req.user = value;
            next();
        }

    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })

    }
}
module.exports = verifyUser;