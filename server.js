const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const { menuItems, orderHistory } = require('./data');

app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/menu', (req, res) => {
    res.json(menuItems);
});

app.post('/order', (req, res) => {
    const { sessionId, order } = req.body;
    orderHistory.push(order);
    req.session.orderHistory = orderHistory;
    res.json({ message: 'Order placed successfully!' });
});

app.get('/order-history', (req, res) => {
    res.json(req.session.orderHistory || []);
});

app.get('/current-order', (req, res) => {
    res.json(req.session.currentOrder || []);
});

app.post('/cancel-order', (req, res) => {
    req.session.currentOrder = [];
    res.json({ message: 'Order canceled.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
