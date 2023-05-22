const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productName: String,
    productDescription: String,
    category: String,
    price: Number,
    image: String,
    brand: String,
    quantity: Number
}, { timestamps: true })


const productModel = mongoose.model("Product", productSchema)
module.exports = productModel;