// middleware/checkAdmin.js
export default function checkAdmin(req, res, next) {
  const roles = req.user?.['https://eco-cart.com/roles'] || [];

  if (roles.includes('admin')) {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
}
