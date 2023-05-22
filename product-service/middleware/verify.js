const consume = require("../../gateway/kafka/consumer.js");
const produce = require("../../gateway/kafka/producer");


const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(token)
    await produce.send({
        topic: 'tokenData',
        messages: [
            { value: token },
        ],
    });

    // next();
}

module.exports = verifyUser;