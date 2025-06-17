const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() =>{
    console.log("connected");
})
.catch(err => {
    console.log("error aya hai", err);
})

// const p = new Product({
//     name: 'grape fruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
// .then(p => {
//     console.log(p);
// })

// .catch(e => {
//     console.log('error', e);
// })


const seedProducts = [
    { name: 'grape fruit', price: 1.99, category: 'fruit' },
    { name: 'banana', price: 0.49, category: 'fruit' },
    { name: 'carrot', price: 0.89, category: 'vegetables' },
    { name: 'broccoli', price: 1.29, category: 'vegetables' },
    { name: 'strawberry', price: 2.99, category: 'fruit' },
    { name: 'spinach', price: 1.19, category: 'vegetables' },
    { name: 'apple', price: 0.79, category: 'fruit' },
    { name: 'tomato', price: 0.99, category: 'vegetables' }
  ];
  

Product.insertMany(seedProducts)
.then(res =>{
    console.log(res);
})
.catch(e => {
    console.log('error', e);
})
