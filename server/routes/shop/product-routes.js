
const express = require('express');
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const Product = require('../../models/Product')
const { authMiddleware } = require('../../controllers/auth-controllers');

const router = express.Router();

const uploadFolder = './uploads';
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination:uploadFolder,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
})

const upload = multer({ storage: storage });
router.use('/uploads',express.static(uploadFolder));

router.get('/products',async(req,res)=>{
    try{
        const product = await Product.find({});
        if(!product){
            return  res.status(400).json({
                success:false,
                msg:'Product not found !!',
            }) 
        }
        
        res.status(200).json({
            success:true,
            products:product
        }) 

    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            msg:'Some err occurred !!',
        })
    }
})

router.get('/product/:id',authMiddleware,(req,res)=>{
    res.send('Products Details page');
})

router.post('/create-product',upload.single('image'),async(req,res)=>{
    try{
        if (!req.file) {
            return res.status(401).json({ message: 'No image file uploaded' });
        }
        const productData = {
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            stocks: req.body.stocks,
            quantity: req.body.quantity,
            rating: req.body.rating,
            image: req.file.path
        }

        const product = new Product(productData);
        await product.save();
        res.status(200).json({
            success:true,
            msg:'Product created successfully',
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            msg:'Product not created !!',
        })
    }
})


module.exports = router;