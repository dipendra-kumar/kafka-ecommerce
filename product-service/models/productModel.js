const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    subCategory: String,
    price: Number,
    image: String,
    brand: String,
    // quantity: Number
}, { timestamps: true })


const productModel = mongoose.model("Product", productSchema)
module.exports = productModel;