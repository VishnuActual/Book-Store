
const Review = require('./../models/reviewModel')
const appError = require('./../utils/appError')

exports.getAllReviews = async (req,res)=>{
    const bookId = req.params.bookId 
    const reviews = await Review.find({book:bookId})

    if (reviews==null){
        const error = new appError('There is no book with this id', 404) 
        res.status(404).json({
            status:"fail",
            message:error.message 
        })
    }
     
    res.status(200).json({
        status:"success",
        data:{
            reviews 
        }
    })
}

exports.createReview = async(req,res)=>{
    const bookId = req.params.bookId
    const user = req.user 
    const rev = await Review({book:bookId,user:user.id})
    if (rev){
        const error = new appError("Not allowed to give more than one review", 403) 
        res.status(403).json({
            status:"fail",
            message:error.message 
        })
    }
    req.body.book = bookId 
    req.body.user = user.id  
    const newReview = await Review.create(req.body)
     
    res.status(201).json({
        status: "success",
        newReview
    })
}

exports.getReview = async (req,res)=>{
    const id = req.params.id 
    const review = await Review.findById(id) 
    if (!review){
        const error  = new appError("not found any review with this id",404) 
        res.status(404).json({
            status:"fail",
            message:error.message 
        })
    }

    res.status(200).json({
        status:"success",
        review
    })
}

exports.updateReview = async(req,res)=>{

    const id = req.params.id 
    let review = await Review.findById(id)
    if (review.user!==req.user.id){
        const error  = new appError("not allowed",403) 
        res.status(error.statusCode).json({
            status:"fail",
            message:error.message 
        })
    }
    if (!req.body.review){
        req.body.review = review.review 
        
    }
    if (!req.body.rating){
        req.body.rating =review.rating  
    }
    
    const newReview = await Review.findByIdAndUpdate(id, req.body)
     
    res.status(201).json({
        newReview
    })
}

exports.deleteReview = async (req,res)=>{
    
    const id = req.params.id 

    let review = await Review.findById(id)
    if (! review){
        const error  = new appError("not found any review with this id",404) 
        res.status(error.statusCode).json({
            status:"fail",
            message:error.message 
        })
    }
    state = req.user.id.toString()===review.user.id.toString() 
    
    if (state===false){
        const error  = new appError("not allowed",403) 
        res.status(error.statusCode).json({
            status:"fail",
            message:error.message 
        })
    } 
    review = await Review.findByIdAndDelete(req.params.id)
    res.status(203).json({
        status:"success",
        message:"Your review has been deleted"
    })
}