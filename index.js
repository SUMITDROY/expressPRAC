const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() =>{
    console.log("connected");
})
.catch(err => {
    console.log("error aya hai", err);
})

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.listen(3000, () =>{
    console.log("started");
})


app.get('/product', async(req,res)=>{
    const products = await Product.find({})
    console.log( products);
    res.send("all products")
})


// app.get('/product', async (req, res) => {
//     try {
//       const products = await Product.find({});
//       console.log(products); 
//       res.send('products');  
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server error while fetching products");
//     }
//   });
  