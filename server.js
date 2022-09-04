const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
// const userRouter = require('./routes/userRoutes');

const dotenv = require('dotenv')
dotenv.config({
  path: './config.env'
})
const app = express();

require('./db/mongoose')


// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //static file

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);


const port = process.env.PORT || 3000
app.listen(port, ()=>{
  console.log(`app running at ${port}`);
})