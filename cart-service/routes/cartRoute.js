const router = require("express").Router();
const { addItemsToCart, getCartItems, deleteCartItem } = require("../controllers/cart")
const auth = require("../middleware/auth")

router.post("/addToCart", auth, addItemsToCart)
router.get("/getCartItems", auth, getCartItems)
router.delete("/deleteCartItem/", auth, deleteCartItem);

module.exports = router;