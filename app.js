const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const session = require("express-session");
const app = express();

const users = require("./routes/users");
const product = require("./routes/product");
const { red, green, cyanBright } = require("console-log-colors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(config.database);
// On Connection
mongoose.connection.on("connected", () => {
  console.log(green("Connected to Database " + config.database));
});
// On Error
mongoose.connection.on("error", (err) => {
  console.log(red("Database error " + err));
});

/**
 * Set Session Middleware
 */
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
/**
 * Set body parser Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Port Number
const port = config.port || 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/product", product);

// Index Route
app.get("/", (req, res) => {
  res.send("invalid endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(cyanBright.bold.underline("Server started on port " + port));
});
