const fs = require('fs');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_KEY);    

const PDFDocument = require('pdfkit');
const Product = require('../models/product');
const order = require('../models/order');

const { fetchAllProducts, forwardError } = require('../utils');

exports.getIndex = (req, res, next) => {
    fetchAllProducts('shop/index','Shop','/',req,res,next);
}

exports.getProducts = (req, res, next) => {
    fetchAllProducts('shop/product-list','All Products','/products',req,res,next);
}

