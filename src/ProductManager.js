const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  static loadProductsFromJSON() {
    try {
      const rawData = fs.readFileSync('./productos.json');
      const productsData = JSON.parse(rawData);

      const productManager = new ProductManager();

      productsData.forEach((product) => {
        productManager.addProduct(product);
      });

      return productManager;
    } catch (error) {
      console.error('Error loading products from JSON:', error.message);
      throw error;
    }
  }
  
  addProduct(productData) {
    if (!this.validateProductData(productData)) {
      console.error('Invalid product data. All fields are mandatory. Product data:', productData);
      return;
    }

    productData.id = this.nextId++;
    this.products.push(productData);
    console.log('Product added successfully:', productData);
    this.saveProductsToJSON();
  }

  validateProductData(productData) {
    const requiredFields = ['title', 'description', 'price', 'stock'];
    const defaultValues = { status: true, thumbnails: [] };
    const mergedData = { ...defaultValues, ...productData };
    return requiredFields.every(field => mergedData[field]);
  }

  getProducts() {
    console.log('Products:', this.products);
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);

    if (!product) {
      console.error('Product not found.');
    }

    return product;
  }


deleteProductById(id) {
  const productIndex = this.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    console.error('Product not found.');
    return;
  }

  const deletedProduct = this.products.splice(productIndex, 1)[0];

  this.saveProductsToJSON();

  console.log('Product deleted successfully:', deletedProduct);
}

saveProductsToJSON() {
  try {
    const jsonData = JSON.stringify(this.products, null, 2);
    fs.writeFileSync('./productos.json', jsonData);
    console.log('Products saved to productos.json successfully.');
  } catch (error) {
    console.error('Error saving products to JSON:', error.message);
  }
}

updateProductById (id, updatedData) {
  const productIndex = this.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    console.error('Product not found.');
    return;
  }

  this.products[productIndex] = { ...this.products[productIndex], ...updatedData, id };

  this.saveProductsToJSON();

  console.log('Product updated successfully:', this.products[productIndex]);
}

}


module.exports = ProductManager;