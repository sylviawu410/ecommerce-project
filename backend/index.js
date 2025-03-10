const express = require('express');
const app = express();
const port = 3001;
const path = require("path")
// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
// Sample product data
const products = {
    1: { name: "Product 1", price: 9.99 },
    2: { name: "Product 2", price: 19.99 }
};
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


