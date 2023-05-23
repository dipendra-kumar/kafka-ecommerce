const consumer = require("../../gateway/kafka/consumer");
const producer = require("../../gateway/kafka/producer");
const authService = async () => {

    try {
        await consumer.subscribe({ topic: "tokenData" })
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(message.value)
            },
        })


    } catch (error) {
        console.log(error)
    }
}
authService();