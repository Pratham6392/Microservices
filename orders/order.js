const express = require('express');
const Order = require('./orderModel.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({
    path: "./.env"
})  

const app = express();
const port = 7777;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const dbconnect=async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
     .then(()=>{
        console.log('DB connected  Order service')
    }).catch((err)=>{
        console.log('error',err)
    })
 }
 dbconnect();

 //creating an order
 app.post('/order', async (req, res) => {
    const { customerId, bookId, getDate, deliveryDate } = req.body;
    const neworder= await Order.create({ customerId, bookId, getDate, deliveryDate });
    console.log(neworder);
    res.status(201).json("Order is successfully created");  
 })

 //list an order
 app.get('/order/:id', async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    console.log(order)
    return res.status(200).json(order);
 }) 

 //list all orders
    app.get('/orders', async (req, res) => {
        const orders = await Order.find();
        console.log(orders)
        return res.status(200).json(orders);
    })

  //delete an order
    app.delete('/order/:id', async (req, res) => {
        const id = req.params.id;
        const order = await Order.findByIdAndDelete(id);
        return res.status(200).json("Order is successfully deleted");
    })  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});