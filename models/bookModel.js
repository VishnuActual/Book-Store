const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 


const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    isbn: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      trim: true
    },
    publisher: {
      type: String,
      trim: true
    },
    publication_year: {
      type: Number
    },
    ratingsAverage:{
      type:Number, 
      default:null 
    },
    ratingsQuantity:{
      type:Number,
      default:null 
    }

},{
  toJSON: {virtuals:true}
});
  

bookSchema.virtual("reviews",{
  
  ref:"Review",
  foreignField:"book",
  localField:"_id"
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
