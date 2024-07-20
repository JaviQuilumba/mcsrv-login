const db = require('./db');

const Login = {
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users_inf WHERE email = $1';
    const values = [email];
    return db.query(query, values);
  },
};

module.exports = Login;