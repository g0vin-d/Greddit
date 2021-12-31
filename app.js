const express = require('express');
const morgan = require('morgan');
const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();

// app logging
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

//Middlewars
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).json(DB);
});

app.use('/', viewRoutes);
app.use('/users', userRoutes);

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
