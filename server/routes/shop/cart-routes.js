
const express = require('express');

const { addToCart, fetchCartItems, deleteCart,quantityUpdate } = require('../../controllers/cart-controllers');

const router = express.Router();

router.post('/add-to-cart',addToCart);
router.get('/:userId',fetchCartItems);
router.put('/:userId/:productId',quantityUpdate);
router.delete('/:userId/:productId',deleteCart);


module.exports = router;