const express = require('express');
const {
    Server
} = require('socket.io')
const path = require('path');
const bodyParser = require('body-parser');
const RouterCart = require('./routes/RoutesCart.js');
const ProductRouter = require('./routes/RoutesProducts.js')
const rTProducts = require('./routes/RoutesRealTimeProducts.js')
const viewsRouter = require('./routes/RoutesViews.js')
const handlebars = require('express-handlebars')

const app = express();
const PORT = 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname, 'views'); 

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', ProductRouter);
app.use('/api/carts', RouterCart);
app.use('/', viewsRouter);
app.use('/', rTProducts)

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

//   const socketServer = new Server(httpServer);
// socketServer.on('connection', async (socket) => {
//     console.log(`New user connected: ${socket.id}`);
//     socket.on('newProduct', async (newProduct) => {
//         try {
//             console.log(JSON.stringify(newProduct));
//             await productManager.addProduct(newProduct); 
//             const products = await ProductManager.loadProductsFromJSON();
//             socketServer.emit('updatedProducts', products);
//         } catch (error) {
//            throw new Error(error.message) 
//         }
//     });
// });

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
});
});
