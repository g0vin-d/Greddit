const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.overview = (req, res, next) => {
  res.status(200).render('homepage', {
    title: 'Greddit',
  });
};

exports.login = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Greddit',
  });
};
