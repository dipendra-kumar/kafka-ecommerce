const router = require("express").Router();
const { getCartItems, deleteCartItem } = require("../controller/cart")
const auth = require("../middlewares/auth")

// router.post("/addToCart", auth, addItemsToCart)
router.get("/", auth, getCartItems)
router.delete("/deleteCartItem/", auth, deleteCartItem);


module.exports = router;