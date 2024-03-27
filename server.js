
const app = require('./app')
const mongoose = require('mongoose')
const port = 5000;

// connecting the mongodb server to the app 
DATABASE='mongodb+srv://actual:actual123123@tour.h9z7qkp.mongodb.net/bookstore'
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((connection) => {
    console.log(`Connected to MongoDB: ${connection.connections[0].name}`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  }); 
  




app.listen(port, () => {
  console.log(`App running on port ${port}...`);
}) // here we are getting the app as the port where we are listening the requests 
// one more thing if you get attention that we are using anonymous function after giving the port in app.listen command
