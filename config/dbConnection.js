const mysql = require("mysql");
const LHTLogger = require("../utils/logger");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

connection.connect((err) => {
  if (err) {
    LHTLogger.error(
      "error connecting",
      `error connecting ${err.stack}`,
      {},
      "Sakib Husain Zaidi"
    );
  } else {
    LHTLogger.info(
      "Database Connected",
      `Connection Id${connection.threadId}`,
      {},
      "Sakib Husain Zaidi"
    );
  }
  
  const createTablesQuery = `

  CREATE TABLE IF NOT EXISTS users(

    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
  `;
  connection.query(createTablesQuery , (err ,results) =>{

    if(err)
    {
        LHTLogger.error("error creating table", err, {}, "Sakib Husain Zaidi");
    }
    else{
        LHTLogger.info("table created", '', {}, "Sakib Husain Zaidi");
    }
  })

});
module.exports = connection;
