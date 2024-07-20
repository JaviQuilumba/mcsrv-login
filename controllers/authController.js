// authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/loginModel'); 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.findByEmail(email);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'servicelogintoken', { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const healthCheck = (req, res) => {
  res.status(200).send('OK');
};

module.exports = {
  login,
  healthCheck,
};
