
const app = require('./app')
const mongoose = require('mongoose')

require('dotenv').config();
// connecting the mongodb server to the app 
const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;


DATABASE=databaseUrl
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
