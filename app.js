const express = require("express") 
const userRouter  = require('./routes/userRoutes')
const bookRouter = require('./routes/bookRoutes')
const reviewRouter = require('./routes/reviewRoutes') 

// security methods
const morgan = require('morgan');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');




const app = express() ; 
app.use(helmet())
app.use(express.json())
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max:100,
  windowMS:60*60*1000,
  message:"Too many req to this IP. Try Again in an hour"
})
app.use('api/', limiter)
app.use(express.json({limit:'100kb'})); //to get req.body data from the post request 
app.use(mongoSanitize())
app.use(xss())




app.use(express.json()) // to get the json data form the request 

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime)
    console.log("this is the body that is req:",req.body)
    next();
  }); // adding time when the request comes 



app.use('/bookstore', userRouter) 
app.use('/bookstore/book', bookRouter) ; 
app.use('/reviews', reviewRouter)
module.exports = app;