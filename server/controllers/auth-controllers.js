
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const checkUser =await User.findOne({email});
        if(checkUser){
            return res.status(200).json({success:false,msg:'Email already exists'});
        }
        const hashPassword = await bcrypt.hash(password,12);
        const user = new User({username,email,password:hashPassword});
        await user.save();
        res.status(200).json({
            succes:true,
            msg:'Registration Successful!!'
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            succes:false,
            msg:'Some error occurred'
        })
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user =await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                msg:'User does not exists ! please register first'
            })
        }
        const checkPassword = await bcrypt.compare(password,user?.password);
        if(!checkPassword){
            return res.json({
                success: false,
                message: "Incorrect password! Please try again",
              });
        }

        const token = jwt.sign({id:user._id,email:user.email,username:user.username},'Client_secret_key',{expiresIn:'1h'});

        res.json({
            success:true,
            msg:'Login successfully',
            user:{
                id:user._id,
                email:user.email,
                username:user.username
            },
            token:token
        })
        
    }catch(err){
        res.json({
            succes:false,
            msg:'Some error occurred'
        })
    }
}

const authMiddleware =(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.json({
            success:false,
            msg:'Access denied ! No token provided.'
        })
    }
    try{
        const decode = jwt.verify(token,'Client_secret_key');
        req.user = decode;
        next();
    }catch(err){
        console.log(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                msg: 'Token has expired! Please login again.'
            });
        }
        return res.status(400).json({
            success: false,
            msg: 'Invalid token or something went wrong.'
        });
        
    }
}

module.exports = {registerUser , loginUser,authMiddleware}