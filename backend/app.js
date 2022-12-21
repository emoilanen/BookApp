const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

app.use(cors());

app.use(bodyParser.json({
  extended: true
}))

const bookRouter = require('./controllers/bookRouter');

app.use('/api/books', bookRouter);

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URL).then(() => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.error('MongoDB connection error :', error.message)
  })

module.exports = app;