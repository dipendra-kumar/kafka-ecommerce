const sendMessage = require("../../gateway/kafka/producer");

const productModel = require("../models/productModel")


const addProduct = async (req, res) => {
    const newProduct = new productModel(req.body)
    await newProduct.save();
    return res.send(newProduct);
}

const getProducts = async (req, res) => {
    const allProducts = await productModel.find({});
    return res.send(allProducts)
}


const addToCart = async (req, res) => {
    const { product_id, quantity } = req.query
    const product = await productModel.findById(product_id);
    const data = {
        owner: req.user,
        product: product,
        quantity: Number(quantity)
    }
    console.log(req.user, 'this is final data')
    // sendMessage("productData", data)
    return res.status(200).json({ message: data })
}

module.exports = { addProduct, getProducts, addToCart }