/**
 * User authentication and authorization with Jsonwebtoken
 */
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //Authenticate user with token
    const token = req.header("x-auth-token");

    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });

    //Authorize user, by verifying the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    // attach user obj to the req
    req.user = verified; 
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Export auth module
module.exports = auth;
