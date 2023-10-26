const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const userRouter=require('./route/user')
require("dotenv").config();
const app = express();

// database connection
connection();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use('/api/covert-file',userRouter)

// Enable CORS for all routes
const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Connected..."));
