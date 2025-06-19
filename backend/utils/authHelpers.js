// utils/authHelpers.js
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://pukhrajmotwani23.us.auth0.com/.well-known/jwks.json',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

export const getUserIdFromToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('No auth token provided');

  const token = authHeader.split(' ')[1];

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: 'https://pukhrajmotwani23.us.auth0.com/api/v2/',
        issuer: 'https://pukhrajmotwani23.us.auth0.com/',
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          reject(new Error('Invalid token'));
        } else {
          resolve(decoded.sub); // Auth0 user ID
        }
      }
    );
  });
};
