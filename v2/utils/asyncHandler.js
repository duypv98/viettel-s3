/**
 * 
 * @param {(req: import('express').Request, res: import('express').Response, next?: import('express').NextFunction) => Promise<any>} fn 
 * @returns {import('express').RequestHandler}
 */
function asyncHandler(fn){
  return (req, res, next) => fn(req, res, next).catch(next);
}

module.exports = asyncHandler;