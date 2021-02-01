const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(express.static('.'));


app.use(bodyParser.json());

app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            if (cart[item.id_product]) {
                cart[item.id_product].count += 1
            } else {
                item.count = 1;
                cart[item.id_product] = item;

            }

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/deleteFromCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            delete cart[item.id];

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});