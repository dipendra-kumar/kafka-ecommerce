const consumer = require("../../gateway/kafka/consumer");
const Cart = require("../model/cartModel");
// const productModel = require("../models/productModel");


const getCartItems = async (req, res) => {
    const owner = req.user._id;
    try {
        const cart = await Cart.findOne({ owner });
        if (cart && cart.items.length > 0) {
            res.status(200).send(cart);
        } else {
            res.send(null);
        }
    } catch (error) {
        res.status(500).send();
    }
}



const addItemsToCart = async (cartData) => {

    const owner = cartData.owner;
    const { _id, item, quantity } = cartData;
    try {
        const cart = await Cart.findOne({ owner });
        const price = item.productPrice;
        const name = item.productName;
        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == _id);
            //check if product exists or not

            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity = quantity;
                product.image = item.productImage;
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.items[itemIndex] = product;
                console.log(cart)
                await cart.save();
                res.status(200).send(cart);

            } else {
                cart.items.push({ itemId, name, quantity, price, image: item.productImage });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                await cart.save();
                res.status(200).send(cart);
            }
        } else {
            //no cart exists, create one
            const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, quantity, price, image: item.productImage }],
                bill: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}


const deleteCartItem = async (req, res) => {
    const owner = req.user._id;
    const itemId = req.query.itemId;
    console.log("rrr", itemId)
    try {
        let cart = await Cart.findOne({ owner });
        console.log(cart)
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        //if item exists
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;
            if (cart.bill < 0) {
                cart.bill = 0
            }
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)
            cart = await cart.save();

            res.status(200).send(cart);
        } else {
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}
module.exports = { getCartItems, addItemsToCart, deleteCartItem }