const express = require('express')
const router = express.Router();
const { registerUser, loginUser, authMiddleware } = require('../../controllers/auth-controllers');

router.post('/register',registerUser)
router.post('/login',loginUser)

router.get('/check-auth',authMiddleware,(req,res)=>{
    res.json({
        success: true,
        user: req.user 
    });
});

module.exports =  router;