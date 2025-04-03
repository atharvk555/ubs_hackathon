const express=require('express');

const BookRouter= express.Router();

const {addbook , get_book_by_id }= require('../controllers/book');

BookRouter.post("/add_book",addbook);
BookRouter.get("/get_book",get_book_by_id);

module.exports=BookRouter;

