const express = require('express')
const reviewController = require('./../controllers/reviewController')
const userController = require("./../controllers/userController")

const router = express.Router({mergeParams:true})

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(userController.protect, reviewController.createReview)

router
  .route('/:id')
  .get(reviewController.getReview) 
  .put(userController.protect, reviewController.updateReview)
  .delete(userController.protect, reviewController.deleteReview) 

  
module.exports = router 