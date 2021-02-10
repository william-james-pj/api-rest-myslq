const jwt = require("jsonwebtoken");
let secret = require("../config/secretJwt");

module.exports = function (req, res, next) {
  const authToke = req.headers["authorization"];

  if (authToke === undefined)
    return res
      .status(403)
      .send({ status: false, err: "You are not authenticated" });

  const bearer = authToke.split(" ");
  let token = bearer[1];

  try {
    let decoded = jwt.verify(token, secret);

    if (decoded.role !== 1) next();
    else
      return res
        .status(403)
        .send({ status: false, err: "You don't have permission to access" });
  } catch (error) {
    // console.log(error);
    return res
      .status(403)
      .send({ status: false, err: "You are not authenticated" });
  }
};
