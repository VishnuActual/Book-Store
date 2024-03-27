const express = require('express')
const userController = require('./../controllers/userController') 

const router = express.Router() 
router.route('/login').post(userController.login) 
router.route('/signup').post(userController.signup) 
router
  .route('/user')  
  .get(userController.protect, userController.getAllUsers)
  .post(userController.protect, userController.createUser) 
//   .put() 
//   .delete() ,userController.restrictTo('admin','lead-guide')




module.exports = router;