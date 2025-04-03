const Book = require("../Model/bookschema");
const Donor=require("../models/DonorSchema");
const addbook = async (req, res) => {
  try {
    const book_data = req.body;
    
    
    const newbook = new Book({
      Name: book_data.Name,
      Authors: book_data.Authors,
      // Donors: book_data.Donor_id ? [book_data.Donor_id] : [], // Fix for donors
      Publisher: book_data.Publisher,
      book_image_url: book_data.book_image_url, // Fix variable name
    });

    await newbook.save();

    res.status(201).send({
      status: 201,
      message: "Successfully added new Book",
      newbook,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};
// add donor it to the book
const handelAddDonorToBook = async (req, res) => {
  try {
    const { bookId, donorId } = req.body;

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({
        status: 404,
        message: "Book not found",
      });
    }

    // Add the donor ID if not already present
    if (!book.Donors.includes(donorId)) {
      book.Donors.push(donorId);
      await book.save();
    }

    res.status(200).send({
      status: 200,
      message: "Donor ID added successfully",
      book,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};
// ----------------
// remove donor from book
const removeDonorFromBook = async (req, res) => {
  try {
    const { bookId, donorId } = req.body;

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({
        status: 404,
        message: "Book not found",
      });
    }

    // Remove the donor ID if present
    book.Donors = book.Donors.filter(id => id !== donorId);
    await book.save();

    res.status(200).send({
      status: 200,
      message: "Donor ID removed successfully",
      book,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};
const get_book_by_id = async (req, res) => {
  try {
    const { book_id } = req.body; // Extract book_id
    if (!book_id) {
      return res.status(400).send({ status: 400, message: "Book ID is required" });
    }

    const find_book = await Book.findById(book_id);
    if (find_book) {
      res.status(200).send(find_book);
    } else {
      res.status(404).send({
        status: 404,
        message: "Book Not Available",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};

module.exports = { addbook, get_book_by_id };
