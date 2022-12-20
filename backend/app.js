const express = require('express');
const app = express();
const cors = require('cors');

const bookRouter = require('./controllers/bookRouter');

app.use('/api/books', bookRouter);
app.use(cors({origin: `http://localhost:3000`}));

module.exports = app;