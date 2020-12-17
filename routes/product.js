const express = require('express');
const router = express.Router();
const config = require('../config/database');
const product = require('../models/product');
const app = express();
const path = require('path');
const multer = require('multer');
const DIR = './uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + path.extname(file.originalname));
  }
});
let upload = multer({ storage: storage });

router.post('/get-all-product', (req, res, next) => {

  product.getAllProduct({}, (err, product) => {
    if (err) throw err;
    if (!product) {
      return res.json({ success: false, msg: 'User not found' });
    }
    product.map(
      res => {

        let rootPath = path.join(__dirname, '../');
        let fileName = path.join(rootPath, 'uploads/' , res.image);
        res.image = fileName
      }
    )
    return res.json({ success: true, data: product });
  });
});


router.post('/save-product', upload.single('files'), (req, res) => {

  let fileName = (typeof req.file !== 'undefined') ? req.file.filename : null;
  let products_2 = new product({
    title: req.body.title,
    desccription: req.body.desccription,
    image: fileName,
    price: req.body.price
  });
  product.saveProduct(products_2, (err, product) => {
    if (err) throw err;
    return res.json({ success: true, data: product });

  });

});

router.post('/delete-product', (req, res, next) => {
  console.log(req.body.primary_key);
  product.deletePoduct(req.body.primary_key, (err, product) => {
    if (err) throw err;
    if (!product) {
      return res.json({ success: false, msg: 'product has been deleted successfully....' });
    }
    return res.json({ success: true, data: product });
  });
});





module.exports = router;
