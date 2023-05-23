const mongoose = require("mongoose")

const url = process.env.CART_DATABASE_URL
mongoose.set('strictQuery', false)
mongoose.connect(url, { useNewUrlParser: true })
    .then(console.log("Cart database connected!"))
    .catch(error => console.log(error));
