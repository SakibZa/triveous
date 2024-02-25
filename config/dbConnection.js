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

    const createTablesQueries = [
        `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role enum('admin', 'user') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT
        )
        `
        ,
        `
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          description TEXT,
          availability BOOLEAN NOT NULL DEFAULT true,
          category_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id)
      );
        `
        ,
        `
        CREATE TABLE IF NOT EXISTS cart (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          product_id INT NOT NULL,
          quantity INT NOT NULL DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
      );
        `,
        `
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            total_amount DECIMAL(10, 2) NOT NULL,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        `
    ];

    createTablesQueries.forEach(query => {
        connection.query(query, (err, results) => {
            if (err) {
                LHTLogger.error("error creating table", err, {}, "Sakib Husain Zaidi");
            } 
        });
    });
});

module.exports = connection;
