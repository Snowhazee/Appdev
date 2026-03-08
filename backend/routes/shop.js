const express = require('express');

const shopController = require('../controllers/shopController');

const router = express.Router(); // Router is a mini server
router.get('/products', shopController.getProducts); // /products is the endpoint, shopController.getProducts is the controller function that will be called when the endpoint is hit
router.get('/products/:id', shopController.getProductByIndex); // :id is a route parameter, it will be replaced by the actual id of the product when the endpoint is hit

