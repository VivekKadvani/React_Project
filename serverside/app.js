const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const newvestRoute = require("./src/routes/newvesting/vestnew")
const currentvestRoute = require("./src/routes/currentvest/index")
const whitelistRoute = require("./src/routes/whitelist/index");
const registerRoute = require("./src/routes/Register/register")
const auth = require("./src/middleware/auth");
require("dotenv").config();

// adding different configurations
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",auth);
app.use("/api/register",registerRoute)
app.use("/api/vestnew",newvestRoute);
app.use("/api/currentvests",currentvestRoute);
app.use("/api/whitelist", whitelistRoute);

// listening the request on specified port
const port  =  process.env.PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})