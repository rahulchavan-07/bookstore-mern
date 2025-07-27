const express = require("express");

const app = express();

const cors = require("cors")

app.use(express.json())

require("dotenv").config();

const connection = require('./connection');

const user = require("./routes/user");

const books = require("./routes/book");

const favourite=require("./routes/favourite");

const Cart =require("./routes/cart");

const Order = require("./routes/order");

app.use(cors());

app.use(express.json());


// routes : 


app.use("/api",user);

app.use("/api",books);

app.use("/api",favourite);

app.use("/api",Cart);

app.use("/api",Order);


// connect to mongoDB :

connection();

// port 
const PORT = process.env.PORT || 3000;

// server started :

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})