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


module.exports = { addProduct, getProducts }