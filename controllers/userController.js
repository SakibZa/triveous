const dbConnection = require("../config/dbConnection");
const HttpHandler = require("../utils/HttpHandler");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const registerQuery = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;

  dbConnection.query(
    registerQuery,
    [username, email, password],
    (error, result) => {
      if (error) {
        return HttpHandler.error(res, error);
      } else {
        const insertedUserId = result.insertId;
        const selectQuery = `SELECT * FROM users WHERE id = ?`;

        dbConnection.query(selectQuery, [insertedUserId], (err, rows) => {
          if (err) {
            return HttpHandler.error(res, err);
          } else {
            return HttpHandler.success(res, rows[0]);
          }
        });
      }
    }
  );
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

  const loginQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;

  dbConnection.query(loginQuery, [email, password], (error, rows) => {
    if (error) {
      return HttpHandler.error(res, error);
    } else {
      if(rows.length){
        const user = rows[0];
        const token = jwt.sign({id: user.id, email: user.email}, config.SECRET, { expiresIn: '1d'});
        return HttpHandler.success(res,{ user, token });
      } else {
        return HttpHandler.unauthorized(res, null, "Invalid email or password");
      }
    }
  });       
}
