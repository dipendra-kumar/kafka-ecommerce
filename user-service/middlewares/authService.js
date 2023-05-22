const consumer = require("../../gateway/kafka/consumer");
const producer = require("../../gateway/kafka/producer");
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const authService = async () => {
    var userData;
    try {

        await consumer.subscribe({ topic: "userData" })
        await consumer.run({
            // this function is called every time the consumer gets a new message
            eachMessage: ({ message }) => {
                // here, we just log the message to the standard output
                console.log(`received message: ${message.value}`)
            },
        })
    } catch (error) {
        console.log(error)
    }
}
authService();