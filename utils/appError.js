class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  

module.exports = AppError;


// Example usage:
// const error = new CustomError('Resource not found', 404);
// console.log(error.message); // Output: 'Resource not found'
// console.log(error.statusCode); // Output: 404
// console.log(error.status); // Output: 'fail'
// console.log(error.stack); // Outputs the stack trace
// console.log(error instanceof CustomError); // Output: true
