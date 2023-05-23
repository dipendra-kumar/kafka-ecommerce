const producer = require("../../gateway/kafka/producer");
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

    const product = "Hello world"
    console.log(product)
    const data = await producer.send({
        topic: 'productData',
        messages: [
            { value: JSON.stringify(product) },
        ],
    });
    res.status(200).json({ message: data })
}


module.exports = { addProduct, getProducts, addToCart }