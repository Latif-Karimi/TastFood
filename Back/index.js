const express = require("express");
const app = express()
const mongoDB = require("./db")
const cors = require ("cors");


app.use(cors());
mongoDB();
app.use(express.json())
 
app.use("/api/",require ("./Routes/CreatUser"))
app.use("/api/",require ("./Routes/DisplayData"))
app.use("/api/",require ("./Routes/OrderData"))
app.listen(3333,()=>{
    console.log("Server is runing on port 3333");
});