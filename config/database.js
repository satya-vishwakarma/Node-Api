require("dotenv").config();
module.exports = {
  // configure the code below with your username, password and mlab database information
  // database: 'mongodb://satya11:Samsung1212@ds113648.mlab.com:13648/firetrack',   //prod
  //database:"mongodb+srv://satya9125:26ZfPds8iKKf5Dv0@firedb.6oyha.mongodb.net/FireCode?retryWrites=true&w=majority", //prod
  // database: 'mongodb+srv://root_user:root@firedb.6oyha.mongodb.net/FireCode?retryWrites=true&w=majority',   //prod

  database: process.env.DATABASE_URL, //dev
  port: process.env.PORT,
  secret: "yoursecret",
};
