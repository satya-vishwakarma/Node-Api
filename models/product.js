const mongoose = require('mongoose');
const config = require('../config/database');

// Product Schema
const ProductSchema = mongoose.Schema ({ 
  local : {
    username : String,
    password : String,
  },
  title: {
    type: String,
    required : true
  },
  desccription: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const products = module.exports = mongoose.model('products', ProductSchema);
module.exports.getAllProduct = function(find, callback) {
  products.find({}, callback);
}

module.exports.saveProduct = function(product_data , callback){
  product_data.save(callback);
  //products.save(product_data, callback);
}
module.exports.deletePoduct = function (id, callback){  
  products.findByIdAndRemove(id ,callback);
}
  
