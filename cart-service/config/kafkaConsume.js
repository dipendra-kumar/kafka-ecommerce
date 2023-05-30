const consumer = require("../../gateway/kafka/consumer");
const { addItemsToCart } = require("../controller/cart");


const getProducts = async () => {
    try {
        await consumer.subscribe({ topic: "tokenData" })
        console.log('Consumer subscribed!')
        await consumer.run({

            eachMessage: ({ message }) => {
                const productData = JSON.parse(message.value)
                addItemsToCart(productData)
            },
        })

    } catch (error) {
        console.log(error)
    }
}

getProducts();
module.exports = getProducts;