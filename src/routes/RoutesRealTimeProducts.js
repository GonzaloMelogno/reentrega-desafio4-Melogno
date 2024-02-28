const express = require('express');
const rTProducts = express.Router();
const ProductManager = require('../ProductManager.js');

const productManager = new ProductManager('./src/productos.json');


rTProducts.get("/realTimeProducts", async (req, res) => {
    try {
        let products = await productManager.loadProductsFromJSON();
        return res.render('realTimeProducts', {
            products: products
        })
        
    } catch (error) {
        throw new Error(error.message)
    }
})




module.exports = rTProducts;