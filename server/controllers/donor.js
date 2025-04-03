const BookInventory = require("../models/BookInventorySchema");
const Donor=require("../models/DonorSchema");
const Store=require("../models/storeSchema");
const createDonor = async (userId) => {
    try {
        // console.log(userId);
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is not available" });
      }
  
      let donor = await Donor.findOne({ user: userId });
  
      if (donor) {
        return donor;
      }
  
      donor = new Donor({
        user: userId,
        booksDonated: 0,
        certificateLink: null,
      });
      await donor.save();
      return donor;
    } catch (err) {
        return NULL;
    }
  };

  const appendInventoryToStore = async ({storeId,inventoryId}) => {
    try {
    //   const { storeId, inventoryId } = req.body;
      console.log(storeId,inventoryId);
      if (!storeId || !inventoryId) {
        return res.status(400).json({ success: false, message: "Store ID and Inventory ID are required" });
      }
  
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({ success: false, message: "Store not found" });
      }
  
      store.inventory.push({ bookId: inventoryId, amount: 0 });
      await store.save();
      
    //   res.status(200).json({ success: true, message: "Inventory added to store", store });
    } catch (err) {
    //   res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  };

  
const addBookToInventory = async (req, res) => {
  try {
    const userId=req?.user?.id;
    // console.log(req);
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is not available" });
    }
    // console.log(userId);
    const d=await createDonor(userId);
    // console.log(d);
    const donorId =d?._id;
    if(!donorId){
        return res.status(400).json({ success: false, message: "Donor ID is not available" });
    }
    const {storeId,bookId, numberOfCopies, condition,images} = req.body;

    if (!bookId || !numberOfCopies || !condition || !images) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bookInventory = new BookInventory({
      book: bookId,
      numberOfCopies,
      condition,
      images,
      addedBy:donorId,
    });
    await bookInventory.save();
    // update in store
    //add this inventory to the store
    const bookInventoryId=bookInventory?._id;
      await Store.findByIdAndUpdate(
        storeId, 
        { $push: { inventory: bookInventory?._id } },
        { new: true } 
    );
    await appendInventoryToStore(storeId,bookInventoryId);
    const donor2= await Donor.findByIdAndUpdate(
        donorId,
        { $inc: { booksDonated: numberOfCopies } },
        { new: true, runValidators: true }
      );

    res.status(201).json({ message: "Book added to inventory successfully", bookInventory });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports={addBookToInventory,createDonor};