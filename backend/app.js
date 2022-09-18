require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handleError');
const router = require('./routes/index');
const cors = require('./middlewares/cors');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config({
    path: '.env.default',
  });
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(cors);

app.use(router);

app.use(errors()); // ошибки celebrate
app.use(handleError); // центральная обработка ошибок

app.listen(process.env.PORT);
