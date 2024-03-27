const express = require("express") 
const userRouter  = require('./routes/userRoutes')
const bookRouter = require('./routes/bookRoutes')
const reviewRouter = require('./routes/reviewRoutes') 


const app = express() ; 

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