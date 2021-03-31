const moment = require("moment");

// logger middleware when new request comes

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${res.statusCode} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
