const BookInventory = require("../models/BookInventorySchema");
const addBookToInventory = async (req, res) => {
  try {
    const { bookId, numberOfCopies, condition, userId } = req.body;

    if (!bookId || !numberOfCopies || !condition || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bookInventory = new BookInventory({
      book: bookId,
      numberOfCopies,
      condition,
      addedBy: userId,
    });

    await bookInventory.save();
    res.status(201).json({ message: "Book added to inventory successfully", bookInventory });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports={addBookToInventory};