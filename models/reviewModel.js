const mongoose = require("mongoose")
const Book = require("./bookModel")
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'Review must belong to a Book.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



reviewSchema.pre('save', async function (next) {
    try {
        const bookId = this.book
        let rating = 0  
        let quantity = 0 
        let cur_book = await Book.find({id:bookId}) 
        rating_avg = cur_book.ratingsAverage 
        if (rating_avg==null){
            rating = this.rating
            quantity = 1 

        }
        else{
            quantity = cur_book.ratingsQuantity
            rating = this.rating+ quantity*cur_book.ratingsAverage 
            rating = rating/(quantity+1)
            rating = rating.toFixed(2);
            quantity  = quantity+1 

        }
        await Book.findByIdAndUpdate(bookId, {ratingsAverage:rating, ratingsQuantity:quantity}) 




      next();
    } catch (error) {
      
      next(error);
    }
  });
  


reviewSchema.pre(/^find/, async function(next){
    // this.populate({
    //     path:'book',
    //     select:'title' 
    // })
    // .populate({
    //     path:"user",
    //     select:"name"
    // })
    this.populate({
        path:"user",
        select:"name"
    })

    next() 
})

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review;