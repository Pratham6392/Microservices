const express = require('express');
const Customer = require('./customerModel.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = 5454;
dotenv.config({
    path: "./.env"
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use(bodyParser.json());

const dbconnect=async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
     .then(()=>{
        console.log('DB connected  Customer service')
    }).catch((err)=>{
        console.log('error',err)
    })
 }
 dbconnect();

app.use(express.urlencoded({ extended: true }));


//creating a customer
 app.post('/customer', async (req, res) => {
    const { Name, Age, Address } = req.body;

    if(!Name || !Age || !Address) {
        return res.status(400).json("Please provide all the details");
    }
    if(typeof Age !== 'number') {
        return res.status(400).json("Age must be a number");
    }
    if(Age < 10) {
        return res.status(400).json("Books and orders are only allowed for customers above 10 years of age");
    }

    const newCustomer = await Customer.create({ Name, Age, Address });
    console.log(newCustomer);
    res.status(201).json("Customer is successfully created");
 });


//list a customer
 app.get('/customer/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    console.log(customer)
    return res.status(200).json(customer);
 })


//list all customers
app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    console.log(customers);
    return res.status(200).json(customers);
})




//delete a customer
app.delete('/customer/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await Customer.findByIdAndDelete(id);
    return res.status(200).json("Customer is deleted successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});