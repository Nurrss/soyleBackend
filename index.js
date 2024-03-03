const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const registerRoute = require('./routes/register');
const userRoute = require('./routes/users');
const examRoute = require('./routes/exam');
const resultRoute = require('./routes/result');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
  },
  apis: ['routes/*.js'], // Укажите путь к вашим файлам маршрутов
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = 8000;

app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors());
app.use('/register', registerRoute);
app.use('/users', userRoute);
app.use('/exams', examRoute);
app.use('/results', resultRoute);

const DB_URL =
  'mongodb+srv://nurrsserkul:nurrs123@cluster0.yfqy8rx.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(DB_URL)
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log('Backend server is running at: ', port);
  });
});

mongoose.connection.on('error', err => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log',
  );
});

// it should be in the end
app.use(function (req, res) {
  return res.status(404).json({ message: 'Endpoint not found' });
});
