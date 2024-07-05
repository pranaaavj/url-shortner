const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');
const { connectToMongoDB } = require('./connection');

const URLroute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

//setting ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//mongo Connection
connectToMongoDB(
  'mongodb+srv://jpvelloor:brototype@url-shortner.mazujup.mongodb.net/?retryWrites=true&w=majority&appName=URL-shortner'
)
  .then(() => {
    console.log('Conneted to MongoDB');
  })
  .catch(() => {
    console.log('Connection to Mongo Failed');
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, URLroute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

//Server Listening
app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});
