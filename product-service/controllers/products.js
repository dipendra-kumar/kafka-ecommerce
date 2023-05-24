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
    const { product_id, quantity } = req.query
    const product = await productModel.findById(product_id);
    product.quantity = quantity
    const data = {
        owner: req.user,
        product: product,
    }
    await producer.send({
        topic: 'tokenData',
        messages: [
            { value: JSON.stringify(data) },
        ],
    });
    return res.status(200).json({ message: data })
}


module.exports = { addProduct, getProducts, addToCart }