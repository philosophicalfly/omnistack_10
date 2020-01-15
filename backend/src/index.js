const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

//MongoDB:
//Non relational, easy out-of-the-box experience, small configs.
//Connecting to MongoDB Atlas
mongoose.connect('mongodb+srv://bardini:bardini@cluster0-rmrex.mongodb.net/wazev?retryWrites=true&w=majority', {
   useNewUrlParser: true,   //Removing warnings
   useUnifiedTopology: true //Removing warnings
});

//Tell express that POSTs are using JSON.
app.use(express.json());
//Use routes.js to the routes
app.use(routes);
//Runs in localhost:8080
app.listen(8080);
