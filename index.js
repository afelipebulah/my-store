const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;

const default_size_products = 5;
const max_size_products = 1000;

app.listen(port, () => {
  console.log(`La app de ejemplo esta escuchando por el puerto ${port}`);
})

app.get('/', (req, res) => {
  res.send('¡Bienvenido, esta visitando la versión 0.0.1 de my-store. Hacemos usos de ExpressJs!');
});

app.get('/products', (req, res) => {
  const { size } = req.query;
  let products = [];

  products = generateListProducts(size);

  res.json(products);
});

app.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  if(productId >= 0){
    let product;
    product = generateProduct(productId);
    res.json(product);
  }else{
    res.send(`Lo sentimos, no se encontró informacion para el producto con id ${productId}.`);
  }
});

function generateProduct(productId){
  const product = [{
    id : productId,
    nombre : faker.commerce.productName(),
    precio : faker.commerce.price(100, 999, 0, '$'),
    imagen : faker.image.imageUrl()
  }];

  return product;
}

function generateListProducts(size){
  let limit = size || default_size_products;
  if(size > max_size_products){
    limit = max_size_products;
  }

  let products = [];

  for (let i = 0; i < limit; i++) {
    products.push({
      id : i+1,
      nombre : faker.commerce.productName(),
      precio : faker.commerce.price(100, 999, 0, '$'),
      imagen : faker.image.imageUrl()
    });
  }

  return products;
}