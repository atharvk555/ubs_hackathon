const mongoose = require("mongoose");
const BookInventory = require("../models/BookInventorySchema");
const Donor = require("../models/DonorSchema");
const Store = require("../models/storeSchema");
const Book = require("../Model/bookschema");

const createDonor = async (userId) => {
  try {
    if (!userId) {
      return null; // Returning null instead of sending a response
    }

    let donor = await Donor.findOne({ user: userId });

    if (donor) return donor;

    donor = new Donor({
      user: userId,
      booksDonated: 0,
      certificateLink: null,
    });

    await donor.save();
    return donor;
  } catch (err) {
    console.error("Error creating donor:", err);
    return null;
  }
};

const appendInventoryToStore = async (storeId, inventoryId) => {
  try {
    if (!storeId || !inventoryId) {
      console.error("Store ID and Inventory ID are required");
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(storeId) || !mongoose.Types.ObjectId.isValid(inventoryId)) {
      console.error("Invalid Store ID or Inventory ID");
      return;
    }

    await Store.findByIdAndUpdate(
      storeId,
      { $push: { inventory: new mongoose.Types.ObjectId(inventoryId) } },
      { new: true }
    );
  } catch (err) {
    console.error("Error appending inventory to store:", err.message);
  }
};

const AddBookToDataBase = async (book_title, author_name, publisher, book_image) => {
  try {
    const newBook = new Book({
      Name: book_title,
      Authors: author_name,
      Publisher: publisher,
      book_image_url: book_image,
    });

    await newBook.save();
    return newBook;
  } catch (err) {
    console.error("Error adding book:", err);
    return null;
  }
};
// fucntion to get the caterogy
const addBookToInventory = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is not available" });
    }

    const { book_title, author_name, publisher, book_image, quantity, condition } = req.body;
    console.log(req.body)
    if (!book_title || !author_name || !publisher || !book_image || !quantity || !condition) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //  here is the function to get the
     
    // --------------------------------
    // Create a book entry
    const book1 = await AddBookToDataBase(book_title, author_name, publisher, book_image);
    if (!book1) {
      return res.status(500).json({ message: "Book not created" });
    }

    const bookId = book1?._id?.toString();
    if (!bookId) {
      return res.status(500).json({ message: "Book ID not found" });
    }

    // Create or fetch the donor
    const donor = await createDonor(userId);
    if (!donor) {
      return res.status(400).json({ success: false, message: "Donor ID is not available" });
    }

    const donorId = donor?._id?.toString();
    if (!donorId) {
      return res.status(400).json({ message: "Donor ID conversion failed" });
    }

    const storeId = "67ee5c689918d6f1f17b1ac9"; // Replace with dynamic storeId if needed

    // Create book inventory
    const bookInventory = new BookInventory({
      book: new mongoose.Types.ObjectId(bookId),
      numberOfCopies: quantity,
      condition,
      images: book_image,
      addedBy: new mongoose.Types.ObjectId(donorId),
    });

    await bookInventory.save();

    // Add inventory to store
    await appendInventoryToStore(storeId, bookInventory._id);

    // Update donor's books donated count
    await Donor.findByIdAndUpdate(
      donorId,
      { $inc: { booksDonated: quantity } },
      { new: true, runValidators: true }
    );

    res.status(201).json({ message: "Book added to inventory successfully", bookInventory });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
const axios=require('axios');
async function getBookMetaData(req,res){
  try{
      const {book_image_url}=req.body;
      console.log("url",book_image_url);
      const response=await axios.post(`http://127.0.0.1:5000/predict`,{image_url:book_image_url});
      console.log(response.data);
      return res.status(200).json(response.data);
      // return res.status(200).json({
      //   success:true,
      //   response,
      // })
  }
  catch(err){
    return res.status(500).json({
      message:err.message
    })
  }
}
module.exports = { addBookToInventory, createDonor,getBookMetaData};
