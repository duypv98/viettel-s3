const { ServerError } = require('../common/errors');
const { failureResponse, serverErrorResponse } = require('../common/responses');

/**
 * 
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function handleAPIError(err, req, res, next) {
  if (err) {
    if (err instanceof ServerError) {
      const { status, message, data } = err;
      if (status === 200) {
        return failureResponse(res, { message, data });
      } else {
        return serverErrorResponse(res, status, { message, data });
      }
    } else {
      console.error(err);
      return serverErrorResponse(res, 500, { message: 'Internal Server Error' });
    }
  }
  return next();
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function handleNotFoundError(req, res, next) {
  serverErrorResponse(res, 404, { message: `Endpoint ${req.method} ${req.url} not found` });
  return next();
}

module.exports = {
  handleAPIError,
  handleNotFoundError
}