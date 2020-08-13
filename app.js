const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-errors');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyparser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
next();
});


app.use('/api/users',usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});
// below one is used to connect the mongodb atlas to cloud database 
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-erwbv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() =>
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`).then(() =>
{ 
  app.listen(4000)
}).catch(err => {
  console.log(err);
});