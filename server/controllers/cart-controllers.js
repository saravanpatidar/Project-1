const Cart = require("../models/Cart");
const Product = require("../models/Product");


const addToCart = async(req,res)=>{
    
    try{
        const {userId,productId,quantity}=req.body;

        if(!userId || !productId || quantity <=0){
            return res.status(400).json({message:'Invalid data provided!!'});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }

        let cart = await Cart.findOne({userId});
        

        if(!cart){
            cart = new Cart({userId,cartItems:[]});
        }
        
        const findCurrentProductIndex = cart.cartItems.findIndex((item)=>item.productId.toString() === productId);

        if(findCurrentProductIndex ===-1){
            cart.cartItems.push({productId,quantity});
        }else{
            cart.cartItems[findCurrentProductIndex].quantity += quantity;
        }
        await cart.save();
        res.json({
            success:true,
            msg:'Product added to cart successfully!!'});
        }catch(err){
            console.log(err);
            res.status(404).json({
                success:false,
                msg:'Something err occurred!!'
            })
            
        }
}

const fetchCartItems =async(req,res)=>{
    
    try{
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate({
            path: "cartItems.productId",
            select: "image name price",
          });
          

        if(!cart){
            return res.json({
                success:false,
                msg:'Cart not found!!'
            })
        }
         const validCartItems = cart.cartItems.filter((item)=>item.productId);

         if(validCartItems.length < cart.cartItems.length){
            cart.cartItems = validCartItems;
            await cart.save();
         }


        res.status(200).json({
            success:true,
            cartItems:cart.cartItems
        })

    }catch(err){
        console.log(err);
        res.status(404).json({
            success:false,
            msg:'Something err occurred!!'
        })
    }
}

const quantityUpdate = async (req,res)=>{
    try{
        const {userId,productId} = req.params;
        const {action} =req.body;
        const cart = await Cart.findOne({ userId });
        const cartItem = cart.cartItems.find((item) => item.productId.toString() === productId);
        if(!cartItem){
            return res.json({
                success:false,
                msg:'Item not found!!'
            })
        }
        if(action ==='add'){
            cartItem.quantity += 1;
        }else if(action ==='minus' && cartItem.quantity > 0){
            cartItem.quantity -= 1;
        }
        await cart.save();
        await cart.populate({
            path:'cartItems.productId',
            select:'name price image '
        })

        res.status(200).json({
            success:true,
            cartItems:cart.cartItems
        })


    }catch(err){
        console.log(err);
        
        res.status(404).json({
            success:false,
            msg:'Something error occurred!!'
        })
    }
}

const deleteCart = async(req,res)=>{
    try{
        const {userId, productId} = req.params;
        const cart = await Cart.findOne({ userId }).populate({
            path: "cartItems.productId",
            select: "image name price",
            });
            if(!cart){
                return res.json({
                    success:false,
                    msg:'Cart not found!!'
                })
            }

            cart.cartItems = cart.cartItems.filter(item=>item.productId._id.toString() !== productId)
            await cart.save();
            res.status(200).json({
                success:true,
                msg:'Item deleted successfully!!',
                cartItems:cart.cartItems
            })
        
    }catch(err){
        console.log(err);
        res.status(404).json({
            success:false,
            msg:'Something err occurred!!'
            })
    }
}

module.exports = {addToCart , fetchCartItems, deleteCart,quantityUpdate }