const express = require('express');
const {
    Server
} = require('socket.io')
const path = require('path');
const bodyParser = require('body-parser');
const RoutesCart = require('./routes/RoutesCart');
const RoutesProducts = require('./routes/RoutesProducts')
const RoutesRealTimeProducts = require('./routes/RoutesRealTimeProducts')
const RoutesViews = require('./routes/RoutesViews')
const handlebars = require('express-handlebars')

const app = express();
const PORT = 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname, 'views'); 

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', RoutesProducts);
app.use('/api/carts', RoutesCart);
app.use('/', RoutesViews);
app.use('/', RoutesRealTimeProducts)

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  const socketServer = new Server(httpServer);
socketServer.on('connection', async (socket) => {
    console.log(`New user connected: ${socket.id}`);
    socket.on('newProduct', async (newProduct) => {
        try {
            console.log(JSON.stringify(newProduct));
            await productManager.addProduct(newProduct); 
            const products = await ProductManager.loadProductsFromJSON();
            socketServer.emit('updatedProducts', products);
        } catch (error) {
           throw new Error(error.message) 
        }
    });
});

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
});
});
