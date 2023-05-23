const consumer = require("../../gateway/kafka/consumer")

const authService = async () => {
    try {
        await consumer.subscribe({ topic: "productData" })
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(JSON.parse(message.value))
            },
        })

    } catch (error) {
        console.log(error)
    }
}
authService();