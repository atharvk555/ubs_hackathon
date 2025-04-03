const express=require('express');
const schoolRouter = express.Router();;
const {getBooks,create_request,getallbooks,bookSearchInStore}= require('../controllers/school');

schoolRouter.get('/get-books' ,getBooks );
schoolRouter.get('/search_in_store',bookSearchInStore);
schoolRouter.get('/get-all-books' ,getallbooks );
schoolRouter.get('/create-request' ,create_request );
 

module.exports= schoolRouter;