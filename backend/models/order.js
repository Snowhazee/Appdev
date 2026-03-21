const mongoose = require('mongoose');
const orderschema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        require:true,
        min: 1
    },
    totalPrice:{
        type:Number,
        required:true
    },
},{timestamps:true});

