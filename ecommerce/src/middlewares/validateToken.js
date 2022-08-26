import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export default (req, res, next) => {
  const accessToken = req.headers['authorization'] || req.headers['Authorization'];

  if (!accessToken) {
    return res.status(401).json({ errors: [{ msg: 'Unauthorized, no token detected' }] });
  }

  if (!accessToken.toLowerCase().startsWith('bearer ')) {
    return res.status(400).json({ errors: [{ msg: 'Authorization header must be Bearer <token>' }] });
  }

  const token = accessToken.split(' ')[1];

  jwt.verify(token, config.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ errors: [{ msg: 'Forbidden, token expired or incorrect' }] });
    } else {
      req.token = accessToken;
      req.tokenDecoded = decoded;
      next();
    }
  });
};
