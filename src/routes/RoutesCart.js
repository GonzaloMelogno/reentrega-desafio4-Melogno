const express = require('express');
const CartManager = require('../CartManager.js');

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
  const newCart = cartManager.createCart();
  res.json({ message: 'Cart created successfully', cart: newCart });
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cartProducts = cartManager.getCartProducts(cartId);
  res.json({ products: cartProducts });
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity) || 1;

  const result = cartManager.addProductToCart(cartId, productId, quantity);

  if (result.success) {
    res.json({ message: 'Product added to cart successfully', cart: result.cart });
  } else {
    res.status(400).json({ error: result.error });
  }
});

router.delete('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const result = cartManager.removeProductFromCart(cartId, productId);

  if (result.success) {
    res.json({ message: 'Product removed from cart successfully', cart: result.cart });
  } else {
    res.status(400).json({ error: result.error });
  }
  router.delete('/:cid', (req, res) => {
    const cartId = req.params.cid;
  
    const result = cartManager.removeCartById(cartId);
  
    if (result.success) {
      res.json({ message: 'Cart removed successfully' });
    } else {
      res.status(400).json({ error: result.error });
    }
  });
   
}

);

module.exports = router;
