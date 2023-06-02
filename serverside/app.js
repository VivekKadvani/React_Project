const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const newvestRoute = require("./src/routes/newvesting/vestnew")
const currentvestRoute = require("./src/routes/currentvest/index")
const whitelistRoute = require("./src/routes/whitelist/index");
const registerRoute = require("./src/routes/Register/register")
const auth = require("./src/middleware/auth");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// adding different configurations
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())

app.get("/api/login",auth,(req,res)=>{
    res.json({message:"valid"})
});

app.use("/api/register",registerRoute)
app.use("/api/vestnew",auth,newvestRoute);
app.use("/api/currentvests",auth,currentvestRoute);
app.use("/api/whitelist",auth, whitelistRoute);

// listening the request on specified port
const port  =  process.env.PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})