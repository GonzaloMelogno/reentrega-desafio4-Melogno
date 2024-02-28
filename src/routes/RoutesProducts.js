const express = require('express');
const ProductManager = require('../ProductManager');

const router = express.Router();
const productManager = ProductManager.loadProductsFromJSON();

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (isNaN(limit)) {
    res.json({ products: productManager.products });
  } else {
    const limitedProducts = productManager.products.slice(0, limit);
    res.json({ products: limitedProducts });
  }
});

router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const newProductData = req.body;
  productManager.addProduct(newProductData);
  res.json({ message: 'Product added successfully', product: newProductData });
});
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  productManager.deleteProductById(productId);

  res.json({ message: 'Product deleted successfully' });
});


module.exports = router;
