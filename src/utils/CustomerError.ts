// CustomError class in TypeScript
class CustomError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor); // Capture a clean stack trace
  }
}

export default CustomError;
