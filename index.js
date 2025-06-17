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
app.use(express.urlencoded({extended:true}))

app.listen(3000, () =>{
    console.log("started");
})


app.get('/products', async(req,res)=>{
    const products = await Product.find({})
    // console.log( products);
    res.render('products/index', {products})
})

app.get('/products/new', (req,res) =>{
    res.render('products/new')
} )

app.post('/products', async (req,res)=>{
console.log(req.body);
const newProduct = new Product(req.body);/** means getting the data from the user and saving to a varaible */
await newProduct.save() /** means saving to the mongodb server */
console.log(newProduct);
res.redirect(`/products/${newProduct._id}`)
})/** it takes to the new product page */

app.get('/products/:id', async(req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id)
    // console.log(product);
    res.render('products/show',{product})
} )

