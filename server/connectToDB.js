
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('DB connect Successfully')
}).catch(err=>console.log('Something Occurred',err));
