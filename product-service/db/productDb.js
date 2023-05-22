const mongoose = require("mongoose")

const url = process.env.PRODUCT_DATABASE_URL
mongoose.set('strictQuery', false)
mongoose.connect(url, { useNewUrlParser: true })
    .then(console.log("Product database connected!"))
    .catch(error => console.log(error));
