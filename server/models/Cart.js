
const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const cartSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    cartItems:[
        {
            productId :{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                min:1,
                required:true,
            },
        }
    ]

},{timestamps:true}) 

module.exports = model('Cart',cartSchema);