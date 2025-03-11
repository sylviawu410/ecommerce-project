const express = require('express');
const app = express();
const port = 3001;
const path = require("path")
// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
// Sample product data
const products = [
    { pid: 1, name: "The Dandy Chair", price: 640, imageUrl:"furniture1.png" },
    { pid: 2, name: "Rustic Vase Set", price: 206, imageUrl:"furniture2.png" },
    { pid: 3, name: "The Silky Vase", price: 390, imageUrl:"furniture3.png" },
    { pid: 4, name: "The Lucy Lamp", price: 492, imageUrl:"furniture4.png" }
  ];
// Product API endpoint
app.get('/api/product/:pid', (req, res) => {
    const pid = req.params.pid;
    const product = products[pid];

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});



app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});


