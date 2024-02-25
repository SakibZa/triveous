const dbConnection = require("../config/dbConnection");
const HttpHandler = require("../utils/HttpHandler");
module.exports.orderPlace = async (req, res) => {
    const userID = req.params.userID;
    
     let result = [];
     let total_amount = 0;
    try {
        const results = await getCartDetails(userID);
         result.push(results);
         for (const cartDetails of result) {
            for (const item of cartDetails) {
                const price = item.price;
                const quantity = item.quantity;
                total_amount += price * quantity;
           }
        }
        
        const insertQuery = `INSERT INTO orders (user_id, total_amount) VALUES (?, ?)`;
        dbConnection.query(insertQuery, [userID, total_amount], (error, result) => {
            if (error) {
                return HttpHandler.error(res, error);
            }
    
        });
        await deleteCartDetails(userID);

        return HttpHandler.success(res, {"msg":"order placed successfully"});
    } catch (error) {
        return HttpHandler.error(res, "Internal server error", 500);
    }
};
function getCartDetails(userID) {
    return new Promise((resolve, reject) => {
        const getcartDetailQuery = `
            SELECT products.id, products.price, cart.quantity
            FROM cart
            INNER JOIN products ON cart.product_id = products.id
            WHERE cart.user_id = ?
        `;
        
        dbConnection.query(getcartDetailQuery, [userID], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
function deleteCartDetails(userID)
{
    return new Promise((resolve, reject )=>{

        const deleteQuery = `
            DELETE FROM cart WHERE user_id = ?
        `;
        dbConnection.query(deleteQuery, [userID], (err, result) => {
            
            if (err) {
                
                reject(err);
            }
            resolve(result);
        })

    })
}
module.exports.getOrderDetails = async (req, res) => {
    const userID = req.params.userID;
    const getOrderDetailsQuery = `
        SELECT orders.id AS order_id, orders.total_amount, orders.order_date
        FROM orders
        WHERE orders.user_id = ?
    `;

    dbConnection.query(getOrderDetailsQuery, [userID], (err, results) => {
        if (err) {
            return HttpHandler.error(res, "Internal server error", 500);
        }
        return HttpHandler.success(res, results);
    });
}
module.exports.getOrderDetailsById = async (req, res) => {
    const orderID = req.params.orderID;
    const getOrderDetailsQuery = `
        SELECT id AS order_id, user_id, total_amount, order_date
        FROM orders
        WHERE id = ?
    `;

    dbConnection.query(getOrderDetailsQuery, [orderID], (err, results) => {
        if (err) {
            return HttpHandler.error(res, "Internal server error", 500);
        }
        return HttpHandler.success(res, results);
    });
}


