const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv')
const Book= require("./bookModel.js");
const bodyParser = require('body-parser');
dotenv.config({
    path: "./.env"
})


const app = express();
const port = 3000;
//app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(bodyParser.json());


 const dbconnect=async()=>{
    await mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log('DB connected')
    }).catch((err)=>{
        console.log('error',err)
    })
 }
 dbconnect()

 

 app.use(express.urlencoded({ extended: true }));
 app.post('/books', (req, res) => {
    
 })
 //creating a book
 app.post('/book', async (req, res) => { 
    const {title, author, numberPages, publisher} = req.body;
    console.log(req.body)
    const book=await Book.create({title, author, numberPages, publisher})
    book.save();
    console.log(book)
    res.status(201).json("book is succesfully created")

 })
//listing all books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    console.log(books[0])
    res.json(books);})

 //delete a book
 app.delete('/book/:id', async (req, res) => {
    const id = req.params.id;
   console.log(id);
    const book = await Book.findByIdAndDelete(id);
    return res.status(200).json("book is deleted successfully");
})

//listing a book by id
app.get('/book/:id', async (req, res) => {
    const id = req.params.id;
    const book=await Book.findById(id);
    console.log(book);
    return res.status(200).json(book);
})

//shortcut key to comment apart from ctrl+/ 



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


//X31GT9KeUswPBUha