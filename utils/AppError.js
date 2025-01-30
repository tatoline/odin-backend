class AppError extends Error {
    constructor(message, statusCode) {
        super(message)  // Calls the constructor of the parent class (JS's built-in Error class)
        this.statusCode = statusCode
    }
  }
  
  module.exports = AppError
  