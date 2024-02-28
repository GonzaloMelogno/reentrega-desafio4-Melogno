const fs = require('fs');

class CartManager {
  constructor() {
    this.carts = [];
    this.cartFilePath = './cart.json';
    this.cartCounter = 1; 
  }

  createCart() {
    const newCart = {
      id: this.generateId(),
      products: []
    };

    this.carts.push(newCart);
    this.saveCartsToJSON();

    return newCart;
  }

  getCartProducts(cartId) {
    const cart = this.carts.find(c => c.id === cartId);

    return cart ? cart.products : [];
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.carts.find(c => c.id === cartId);
    if (!cart) {
      return { success: false, error: 'Cart not found' };
    }

    const existingProduct = cart.products.find(p => p.product === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCartsToJSON();

    return { success: true, cart };
  }

  removeProductFromCart(cartId, productId) {
    const cart = this.carts.find(c => c.id === cartId);
    if (!cart) {
      return { success: false, error: 'Cart not found' };
    }

    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      this.saveCartsToJSON();
      return { success: true, cart };
    } else {
      return { success: false, error: 'Product not found in the cart' };
    }
  }

  removeCartById(cartId) {
    const cartIndex = this.carts.findIndex(c => c.id === cartId);
    if (cartIndex !== -1) {
      this.carts.splice(cartIndex, 1);
      this.saveCartsToJSON();
      return { success: true, message: 'Cart removed successfully' };
    } else {
      return { success: false, error: 'Cart not found' };
    }
  }

  saveCartsToJSON() {
    try {
      const jsonData = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(this.cartFilePath, jsonData);
      console.log('Carts saved to cart.json successfully.');
    } catch (error) {
      console.error('Error saving carts to JSON:', error.message);
    }
  }

  generateId() {
    const cartId = this.cartCounter++;
    return cartId.toString();
  }
}

module.exports = CartManager;
