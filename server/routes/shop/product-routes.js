
const express = require('express');
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const { authMiddleware } = require('../../controllers/auth-controllers');
const { fetchAllProducts,createProduct,fetchProductById,deleteProduct } = require('../../controllers/product-controllers');

const router = express.Router();

const uploadFolder = path.join('public');

if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)},
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
})

const upload = multer({ storage: storage });
router.use('/public',express.static(uploadFolder));
// router.use('/public', express.static(path.join(__dirname, 'public')));

router.get('/products',fetchAllProducts)

router.get('/product/:userId',fetchProductById)
router.delete('/product/:id',deleteProduct);

router.post('/create-product',upload.single('image'),createProduct)


module.exports = router;