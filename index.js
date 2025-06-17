const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("connected");
    })
    .catch(err => {
        console.log("error aya hai", err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.listen(3000, () => {
    console.log("started");
})

const categories = ['fruit', 'vegetable', 'dairy']


app.get('/products', async (req, res) => {
    const {category} = req.query
    if (category){
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    }else{
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    
    // console.log( products);
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    console.log(req.body);
    const newProduct = new Product(req.body);/** means getting the data from the user and saving to a varaible */
    await newProduct.save() /** means saving to the mongodb server */
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`)
})/** it takes to the new product page */



app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    // console.log(product);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true})
    // console.log(req.body);
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req,res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

