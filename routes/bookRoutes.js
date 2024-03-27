const express = require("express")
const bookController  = require("./../controllers/bookController") 
const userController = require('./../controllers/userController')
const reviewRouter = require('./../routes/reviewRoutes') 
const router = express.Router()


router.use("/:bookId/reviews", reviewRouter)

router 
  .route('/search')
  .get(bookController.getBookBy)

  
router
  .route('/')
  .get(bookController.getAllBook)
  .post(bookController.createBook) 
 
 
module.exports = router;