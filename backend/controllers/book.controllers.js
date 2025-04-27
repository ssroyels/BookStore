import Book from "../model/book.model.js";

export const getBook = async (req,res) => {

    try{
        const book = await Book.find()
        res.status(200).json(book)

    } catch(err){

        console.log("Error :",err);
        res.status(500).json(err);

    }
};

export const postBook = async(req,res) => {
    try{
        const {name,title,price,category,image} = req.body;
        
       
     
        const createdBook = new Book({
            name,
            title,
            price,
            category,
            image
           
        })
        await createdBook.save();
        res.status(201).json({message:"Book created successfully",book:{
         name:createdBook.name,
         title:createdBook.title,
         
        }})
    } catch(err) {
        console.log("Error : ",err.message);
        res.status(500).json({message:"Internal server error"})
    }
}