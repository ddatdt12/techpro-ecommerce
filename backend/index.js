const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const colors = require('colors');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const userRoute = require('./routes/users');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');
const morgan = require('morgan')

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}

app.use(cors());

app.use(express.json());

app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    404,
  );
  next(error);
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`.yellow.bold);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
