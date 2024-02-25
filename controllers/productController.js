const dbConnection = require("../config/dbConnection");
const HttpHandler = require("../utils/HttpHandler");

module.exports.addProduct = async(req, res)=> {
    
    const { title, price, description, availability, category_id } = req.body;
     

    const addProductQuery = `INSERT INTO products (title, price, description, availability, category_id) VALUES (?, ?, ?, ?, ?)`;
        dbConnection.query(addProductQuery, [title, price, description, availability, category_id], (error, result) => {
            if (error) {
                return HttpHandler.error(res, error);
            }
            const insertedProductId = result.insertId;
            const selectProductQuery = `SELECT * FROM products WHERE id = ?`;
            dbConnection.query(selectProductQuery, [insertedProductId], (err, rows) => {
                if (err) {
                    return HttpHandler.error(res, err);
                }
                return HttpHandler.success(res, rows[0]);
            });
        });
   
}

module.exports.updateProduct = async(req, res)=>{

    const { title, price, availability, category_id } = req.body;
    const { id } = req.params;
    const updateQuery = `UPDATE products SET title = ?, price = ?, availability = ?, category_id = ? WHERE id = ?`
    dbConnection.query(updateQuery, [title, price, availability, category_id, id], (error, result) => {
        if (error) {
            return HttpHandler.error(res, error);
        }

        if (result.affectedRows === 0) {
            return HttpHandler.error(res, { message: "Product not found" }, 404);
        }
        const selectProductQuery = `SELECT * FROM products WHERE id = ?`;
        dbConnection.query(selectProductQuery, [id], (err, rows) => {
            if (err) {
                return HttpHandler.error(res, err);
            }
            return HttpHandler.success(res, rows[0]);
        });
    });

}
module.exports.getProducts = async (req, res)=>{

    const categoryId = req.params.id;
    const query = `
        SELECT id, title, price, description, availability
        FROM products
        WHERE category_id = ?;
    `;
    dbConnection.query(query, [categoryId], (error, results) => {
        if (error) {
            return HttpHandler.error(res, error);
        }
        return HttpHandler.success(res, results);
    });
}
module.exports.getProductDetails = async (req, res)=>{

    const productId = req.params.id;
    const query = `
        SELECT id, title, price, description, availability
        FROM products
        WHERE id = ?;
    `;
    dbConnection.query(query, [productId], (error, results) => {
        
        if (error) {
            return HttpHandler.error(res, error);
        }
        return HttpHandler.success(res, results);
    })
}
