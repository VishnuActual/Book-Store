const User = require("./../models/userModel")
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

function createSendToken (req,res,id){
  let jwtSecretKey = "my_secret_key_is_very_simple";
    let data = {
      time: Date(),
      userId: id,
    }
    const token = jwt.sign(data, jwtSecretKey);
    
    return res.status(200).json({
      status:"success",
      token 
    })
}


exports.restrictTo = (...roles)=>{
  return (req,res,next)=>{
      if (!roles.includes(req.user.role)){
          return next( new appError("You are not allow to do so!", 403))
      }
      next(); 
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.user)
    const users = await User.find() 
    res.status(200).json({
      status: 'success',
      users:users
    });
  }
  catch(err){
    res.status(400).json({
      status:"fail",
      err 
    })
  }
};

exports.createUser = async (req,res)=>{
  try{
    const newUser = await User.create(req.body) 
    newUser.password = '' 
    return res.status(201).json({
      status:"success",
      user:newUser 
    })
  }
  catch(err){
    return res.status(401).json({
      status:"fail",
      err
    })

  }
}

exports.signup = async (req,res)=>{
  try{
    console.log("this is signup")
    const newUser = await User.create(req.body) 
    newUser.password = '' 
    console.log(newUser) 
    createSendToken(req,res,newUser.id)
  }
  catch(err){
    return res.status(401).json({
      status:"fail",
      err
    })

  }
}


exports.login = async(req,res)=>{
  try{
    const {email , password } = req.body 
    const user = await User.findOne({email:email}).select('password') 
    if (!user){
      return res.status(404).json({
        status:"fail",
        err:err 
      })
    }
    if (!user.correctPassword(password,user.password)){
      return res.status(404).json({
        status:"fail",
        err:err 
      })
    }
    createSendToken(req,res,user.id) 
  }
  catch(err){
    return res.status(404).json({
      status:"fail",
      err:err 
    })
  }
}

exports.protect = async (req,res, next)=>{
  let token; 

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
      
  }
  const decoded = await promisify(jwt.verify)(token,'my_secret_key_is_very_simple') 
  const freshUser = await User.findById(decoded.userId) 
  if (!freshUser){
    return res.status(404).json({
      status:"fail",
      message:"not authorize to perform action"
    })
  }
  req.user = freshUser
  next()
}