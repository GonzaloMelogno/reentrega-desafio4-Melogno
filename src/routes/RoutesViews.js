const express = require('express');
const viewsRouter = express.Router();
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('./src/productos.json');


viewsRouter.get('/', async (req, res)=>{
    try {
        let products = await productManager.loadProductsFromJSON();
        res.render('home',{
            products: products
        });
    } catch (error) {
        throw new Error(error.message)
    }

})

module.exports = viewsRouter;