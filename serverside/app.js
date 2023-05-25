const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const router = require("./src/routes/login")
require("dotenv").config();


// adding different configurations
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router)


// listening the request on specified port
const port  =  process.env.PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})