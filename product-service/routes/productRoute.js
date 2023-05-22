const express = require("express")
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/products");
const verifyUser = require("../middleware/verify");

router.get("/products/all", verifyUser, getProducts)
router.post("/addProduct", addProduct)

module.exports = router;