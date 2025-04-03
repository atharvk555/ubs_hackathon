const Book = require("../Model/bookschema");

const addbook = async (req, res) => {
    
  try {
    const book_data = req.body;
    const newbook = new Book({
      Name: book_data.Name,
      Author: book_data.Author,
    //   Donors: Donors.push(book_data.Donor_id),
      Publisher: book_data.Publisher,
      book_image_url: book_data.image_url,
    });

    await newbook.save();

    res.send({
      Stautus: 200,
      message: "Successfully added new Book ",
      newbook,
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
};

const get_book_by_id= async(req,res)=>{
    try{
        const book_id= req.body;
        const find_book=await Book.findById(book_id);
        if(find_book){
            res.send(find_book);
        }
        else{
            res.send({
                status : 400,
                message: " Book Not available "
            })
        }
    }
    catch(err){
        
        res.send({
            status : 500, 
            message:"Some Internal Server Error"
        })

    }
    
}

module.exports={addbook,get_book_by_id};