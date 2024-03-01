const express = require('express');
const ProductManager = require('../ProductManager');

const ProductRouter = express.Router();
const productManager = new ProductManager();

ProductRouter.get('/', async (req, res) => {
  try {
    const Products = await productManager.getAll();
    const limit = parseInt(req.query.limit);

    if (isNaN(limit)) {
      res.json({ products: Products });
    } else {
      const limitedProducts = Products.slice(0, limit);
      res.json({ products: limitedProducts });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


ProductRouter.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.findOne(productId);
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

ProductRouter.post('/', (req, res) => {
  const newProductData = req.body;
  productManager.create(newProductData);
  res.json({ message: 'Product added successfully', product: newProductData });
});
ProductRouter.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  productManager.deleteProduct(productId);

  res.json({ message: 'Product deleted successfully' });
});


module.exports = ProductRouter;
