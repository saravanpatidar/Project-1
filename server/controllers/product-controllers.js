const Product = require("../models/Product");


const fetchAllProducts=async(req,res)=>{
    try{
        
        let products = await Product.find({});
        if(!products){
            return  res.status(400).json({
                success:false,
                msg:'Product not found !!',
            }) 
        }
        const limit = parseInt(req.query.limit) || products.length;
        const skip = parseInt(req.query.skip) || 0;
        const startIndex=skip;
        const endIndex= skip+limit || product.length;
        let product = products.slice(startIndex,endIndex);
        
        
        res.status(200).json({
            success:true,
            products:product,
            total:products.length,
            limit,
            skip
        }) 

    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            msg:'Some err occurred !!',
        })
    }
}

const fetchProductById=async(req,res)=>{
    try{
        const {userId} = req.params;
        const product = await Product.findById(userId);
        if(!product){
            return res.status(400).json({
                success:false,
                msg:'Product not found !!',
                })
        }

        res.status(200).json({
            success:true,
            product:product
        }) 

    }catch(err){
        res.status(404).json({
            success:false,
            msg:'Something error occurred !!'
        })
    }
}

const createProduct=async(req,res)=>{
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
}

const deleteProduct=async(req,res)=>{
    try{
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                success:false,
                msg:'Product not found !!'
                })
            }
            res.status(200).json({
                success:true,
                msg:'Product deleted successfully !!',
                })
    }catch(err){
        res.status(404).json({
            success:false,
            msg:'Something error occurred !!'
            })
    }
}

module.exports ={fetchAllProducts,createProduct,fetchProductById ,deleteProduct}