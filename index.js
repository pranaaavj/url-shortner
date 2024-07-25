const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkAuthencationHeader, restrictTo } = require('./middlewares/auth');
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
connectToMongoDB('mongodb://127.0.0.1:27017/urlShortner')
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
app.use(checkAuthencationHeader);

app.use('/url', restrictTo(['NORMAL', 'ADMIN']), URLroute);
app.use('/user', userRoute);
app.use('/', staticRoute);

//Server Listening
app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});
