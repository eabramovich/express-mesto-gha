export class NotAuthenticateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'NotAuthenticate';
  }
}