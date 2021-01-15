const jwt = require('jsonwebtoken');
/**
 * Verify JWT
 */
const jwtAuth = (req, res, next) => {
  
  const authHeader = req.get('authorization');
  //const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).send({ success: false, message: "Token is invalid" });
  }

  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json(403).send({ success: false, message: 'Forbidden Access' })

    req.user = user;
    next();
  });
};

module.exports = jwtAuth;
