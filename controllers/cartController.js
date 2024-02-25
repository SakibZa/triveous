const dbConnection = require("../config/dbConnection");
const HttpHandler = require("../utils/HttpHandler");
module.exports.addProductToCart = async(req, res)=>{
    const {user_id, product_id, quantity} = req.body;
    const addProductToCartQuery = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)`;
    dbConnection.query(addProductToCartQuery, [user_id, product_id, quantity], (error, result) => {
        if (error) {
            return HttpHandler.error(res, error);
        } else {
            const insertedUserId = result.insertId;
            const selectQuery = `SELECT * FROM cart WHERE id = ?`;
            dbConnection.query(selectQuery, [insertedUserId], (err, rows) => {
                if (err) {
                    return HttpHandler.error(res, err);
                }
                return HttpHandler.success(res, rows[0]);
            });
        }
    });
}

module.exports.getCartDetails = async(req, res)=>{

    const userID = req.params.userID;

    // Query to fetch cart details for the given user ID
    const getcartDetailQuery = `
        SELECT products.id, products.title, products.price, cart.quantity
        FROM cart
        INNER JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    // Execute the query
    dbConnection.query(getcartDetailQuery, [userID], (err, results) => {
        if (err) {
            return HttpHandler.error(res, "Internal server error", 500);
        }
        
        return HttpHandler.success(res, results);
    });
}
module.exports.updateCartDetails = async(req, res)=>{
    
    const userID = req.params.userID;
    const productID = req.params.productID;
    const { quantity } = req.body;

    const updateQuery = `
        UPDATE cart
        SET quantity = quantity + ?
        WHERE user_id = ? AND product_id = ?
    `;
    dbConnection.query(updateQuery, [quantity, userID, productID], (err, result) => {
        if (err) {
            return HttpHandler.error(res, "Internal server error", 500);
        }
        if (result.affectedRows === 0) {
            return HttpHandler.error(res, "Product not found in user's cart", 404);
        }
        const selectQuery = `
            SELECT *
            FROM cart
            WHERE user_id = ? AND product_id = ?
        `;
        
        dbConnection.query(selectQuery, [userID, productID], (fetchErr, rows) => {
            if (fetchErr) {
                return HttpHandler.error(res, "Internal server error", 500);
            }
            return HttpHandler.success(res, rows[0]); 
        });
    });
}
module.exports.removeItemFromCart = async(req, res)=>{

    const userID = req.params.userID;
  const productID = req.params.productID;

  const deleteQuery = `
    DELETE FROM cart
    WHERE user_id = ? AND product_id = ?
  `;

  dbConnection.query(deleteQuery, [userID, productID], (err, result) => {
    if(err){
      return HttpHandler.error(res, "Internal server error", 500);
    }

    if(result.affectedRows === 0){
      return HttpHandler.error(res, "Product not found in user's cart", 404);
    }

    return HttpHandler.success(res, {message: "Item removed successfully"});
  });
}