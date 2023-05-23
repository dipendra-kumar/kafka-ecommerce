const express = require("express")
const router = express.Router();
const { addProduct, addToCart, getProducts } = require("../controllers/products");
const verifyUser = require("../middleware/verify");

router.get("/products/all", getProducts)
router.post("/addProduct", addProduct)

router.post("/addToCart", verifyUser, addToCart)
module.exports = router;