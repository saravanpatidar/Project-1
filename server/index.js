
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./connectToDB')

const authRouter = require('./routes/auth/auth-routes');
const shopProductRouter = require('./routes/shop/product-routes');
const shopCartRouter = require('./routes/shop/cart-routes')

const app = express();

const PORT = 3001;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/public',express.static('public'));

app.use('/auth',authRouter)
app.use('/shop',shopProductRouter)
app.use('/shop/cart',shopCartRouter)

app.get('/',(req,res)=>{
    res.send('Hello World!')
})


app.listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`));
