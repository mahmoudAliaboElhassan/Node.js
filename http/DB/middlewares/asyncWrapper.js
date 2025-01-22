const httpStatusText = require("../utils/httpStatusText");
module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => {
      err.statusText = httpStatusText.ERROR;
      return next(err);
    });
  };
};
