const Book  = require('./../models/bookModel') 


exports.createBook = async (req,res)=>{
    const newBook = await Book.create(req.body) 
    res.status(201).json({
        status:"success",
        newBook 
    })
}

exports.getAllBook = async (req,res)=>{
    const books = await Book.find().populate('reviews') 

    res.status(200).json({
        status:"success",
        toalBooks:books.length, 
        books
    })
}

exports.getBookBy = async (req,res)=>{

    const features = req.query
    

    try {
        const book = await Book.find(features)
        res.status(200).json({
            status:"success",
            book 
        })
    } catch (err){
        res.status(404).json({
            status:"fail",
            message:"Book not found with this ISBN number!"
        })
    }
}
