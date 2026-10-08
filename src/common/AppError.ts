export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  //extending error property to support extra field for validatio error
  public readonly fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.fieldErrors = fieldErrors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
