const dbConnection = require("../config/dbConnection");
const HttpHandler = require("../utils/HttpHandler");
module.exports.addProduct = async(req,res)=>{

    const {name,description} = req.body;  
    const addProductQuery = `INSERT INTO categories (name,description) VALUES (?,?)`;
    dbConnection.query(addProductQuery,[name,description],(error,result)=>{
        if(error){
            return HttpHandler.error(res,error);
        }
        else{
            const insertedUserId = result.insertId;
              const selectQuery = `SELECT * FROM categories WHERE id = ?`;

              dbConnection.query(selectQuery, [insertedUserId], (err, rows) => {
                if (err) {
                  return HttpHandler.error(res, err);
                } else {
                  return HttpHandler.success(res, rows[0]);
                }
              });
        }
    });

}
module.exports.getCategories = async(req, res)=>{
    const getCategoriesQuery = `SELECT * FROM categories`;
    dbConnection.query(getCategoriesQuery,(error,results)=>{
        if(error){
            return HttpHandler.error(res,error);    
        }
        else{
            return HttpHandler.success(res,results);
        }
    });
}
module.exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    const updateCategoryQuery = `UPDATE categories SET name = ?, description = ? WHERE id = ?`;
    dbConnection.query(updateCategoryQuery, [name, description, id], (error, result) => {
        if (error) {
            return HttpHandler.error(res, error);
        } else {
            if (result.affectedRows === 0) {
                return HttpHandler.error(res, { message: "Category not found" }, 404);
            }
            const selectQuery = `SELECT * FROM categories WHERE id = ?`;
            dbConnection.query(selectQuery, [id], (err, rows) => {
                if (err) {
                    return HttpHandler.error(res, err);
                } else {
                    return HttpHandler.success(res, rows[0]);
                }
            });
        }
    });
};
