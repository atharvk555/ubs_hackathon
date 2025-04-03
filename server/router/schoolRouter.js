const express=require('express');
const schoolRouter = express.Router();;
const {getBooks,create_request,getallbooks,bookSearchInStore,GetAllRequests}= require('../controllers/school');
const {verifyToken}=require("../middleware/auth");
schoolRouter.post('/get-books' ,getBooks);
schoolRouter.post('/search_in_store',bookSearchInStore);
schoolRouter.get('/get-all-books' ,getallbooks );
schoolRouter.post('/inventory_request' ,verifyToken,create_request );
// schoolRouter.post("/request_completed",completeRequest);
schoolRouter.post("/get_all_requests",verifyToken,GetAllRequests);

module.exports= {schoolRouter};