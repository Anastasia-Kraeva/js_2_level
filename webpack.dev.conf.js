const webpack = require('webpack')
const express = require('express');
const path = require('path')

const { merge } = require('webpack-merge')
// Base config
const baseWebpackConfig = require('./webpack.base.conf')

var fs = require('fs');

var bodyParser = require('body-parser');
const { ModuleFilenameHelpers } = require('webpack');


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 3000,
    overlay: {
      warnings: true,
      errors: true
    },
    setup(app) {

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

    }

  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})