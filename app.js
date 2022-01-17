const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const viewRoutes = require('./routes/viewRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const subredditRoutes = require('./routes/subredditRoutes');
const commentRoutes = require('./routes/commentRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// app logging
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

//Middlewars
//body parser, cookieparser
app.use(express.json());
app.use(cookieParser());

// Data-sanitization: NoSQL injections
app.use(mongoSanitize());

// Data-sanitization: XSS
app.use(xss());

//serving static files
app.use(express.static(path.join(__dirname, '/public')));

app.use(compression());

// app.get('/', (req, res, next) => {
//   res.status(200).json(DB);
// });

app.use('/', viewRoutes);
app.use('/api/post', postRoutes);
app.use('/api/r', subredditRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
