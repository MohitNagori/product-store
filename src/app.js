const express = require('express');
const fetchProducts = require('./api/products');

const app = express();

app.get('/api/products', (req, res) => {
  fetchProducts(req.query.filter, (error, products) => {
    if (error) {
      return res.send({ error });
    } 
    res.send({
      products: products,
    });
  })
});

app.listen(5000, () => {
  console.log('Server is up on port 5000');
});