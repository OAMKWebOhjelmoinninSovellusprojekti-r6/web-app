const db = require("../config/db.js");

module.exports = {
    async get(userId){
      
        let data = {
            'status': 400,
            shoppingCartInfo: null
        }
        try {
            // Get shopping_cart rows from database
            const getQuery = await db.query(
                `SELECT * FROM \`shopping_cart\` WHERE \`user_id\`=${userId} `
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shopping cart row is inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get shopping cart info from query result
                data.shoppingCartInfo = getQuery;
                // Set HTTP status code == success
                data.status = 200;
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status == 500;
        }
        return data;
    },

    async create(shoppingCartData){
        // Default values for return Object
        let data = {
            'status': 400,
            'shoppingcartId': null
        }
        try {
            // Insert row into database
            const createQuery = await db.query(
                `INSERT INTO \`shopping_cart\`(\
                    \`user_id\`\             
                ) VALUES (\
                    '${shoppingCartData.userId}'\
                )`
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one order row are inserted, >= 1 is used only for debugging purposes
            if(createQuery.affectedRows >= 1){
                 // Set HTTP status code == success
                data.status = 200;
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status = 500;
        }
        return data;
    },

    async delete(shoppingCartId) {
        
        var data = {
            'status': 400
        }
        try {
            // Delete row from Database
            const deleteQuery = await db.query(
                `DELETE FROM \`shopping_cart\` WHERE \`idshopping_cart\`=${shoppingCartId}`
            );
            console.log(deleteQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shoppingcart row is inserted, >= 1 is used only for debugging purposes
            if(deleteQuery.affectedRows >= 1) {
                // Set HTTP status code == success
                data.status = 200;
            } 
        } catch (err) {
            // Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal Server Error
            data.status = 500;
        }
        return data;
    },
};
  