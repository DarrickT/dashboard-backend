const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    const verifiedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ succss: false, msg: "JWT expired" });
  }
};


module.exports = authJWT