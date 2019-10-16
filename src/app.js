const express = require('express');
const fetchProducts = require('./api/products');

const app = express();
const PORT = process.env.PORT || 5000;

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', () => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});