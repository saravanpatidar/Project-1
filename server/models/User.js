
const mongoose = require('mongoose');

const { Schema ,model} = mongoose;

const userSchema = new Schema({
    username: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
}) 

module.exports = model('User',userSchema);