const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Inavlid ${err.path} ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or unknown error : don't leak to the client
  } else {
    // 1.) Log error
    // console.error('ERROR 💣', err);
    //2.) send generic error
    res.status(500).json({
      status: 'error',
      message: 'Something went very very  Wrong !',
    });
  }
};

module.exports = (err, req, res, next) => {
  //
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong !';

  if (process.env.NODE_ENV === 'development') {
    const error1 = { ...err };

    console.error('error info:>>>::>', error1);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };

    // console.log('error', error, 'err', err);

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
