
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://spatidar78:spj7869@saravan.qcw47.mongodb.net/NewProject').then(()=>{
    console.log('DB connect Successfully')
}).catch(err=>console.log('Something Occurred',err));
