const db = require("../config/db.js");

module.exports = {
    async get(cartId){
      
        let data = {
            shoppingCartInfo: null
        }
        try {
            // Get all the items in shopping cart 
            const getQuery = await db.query(
                `SELECT item.name AS itemName, description, price, restaurant.image_path, category, quantity, idrestaurant, restaurant.name AS restaurantName
                FROM shopping_cart
                JOIN shopping_cart_item ON shopping_cart.idshopping_cart = shopping_cart_item.shopping_cart_id
                JOIN item ON item.iditem = shopping_cart_item.item_id
                JOIN restaurant ON restaurant.idrestaurant = item.restaurant_id
                WHERE idshopping_cart = ?;`, [cartId]
            
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shopping cart row is inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get shopping cart info from query result
                data.shoppingCartInfo = getQuery;
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
        }
        return data;
    },

    async create(shoppingCartData){
        // Default values for return Object
        let data = {
            'affectedRows': 0
        }
        try {
            // Insert row into database
            const createQuery = await db.query(
                `INSERT INTO shopping_cart_item(item_id,shopping_cart_id,quantity) VALUES(?,?,?);`, 
                [shoppingCartData.item_id, shoppingCartData.shopping_cart_id, shoppingCartData.quantity]
                );
                console.log(createQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one order row are inserted, >= 1 is used only for debugging purposes
            if(createQuery.affectedRows >= 1){
                data.affectedRows = createQuery.affectedRows;
            } else if (createQuery.affectedRows === 0){
                data.affectedRows = createQuery.affectedRows;
            } else {
                data.affectedRows = -1;
            }       
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
        }
        return data;
    },

    async modify(cartItemId, itemQuantity) {
        console.log("model", cartItemId, itemQuantity);
        let data = {
            'affectedRows': 0
        }
        try {
            const updateQuery = await db.query(
                `UPDATE shopping_cart_item SET quantity = ? WHERE idshopping_cart_item = ?;`, [itemQuantity.quantity, cartItemId]
            )
            console.log(updateQuery);
                // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one order row are inserted, >= 1 is used only for debugging purposes
            if(updateQuery.affectedRows >= 1) {
                data.affectedRows = updateQuery.affectedRows;
            } else if (updateQuery.affectedRows === 0){
                data.affectedRows = updateQuery.affectedRows;
            } else {
                data.affectedRows = -1;
            } 
        } catch (err) {
            // Debug error in case where try/catch fails
            console.log(err);
        }
        return data
    },

    async delete(cartItemId) {
        
        var data = {
            'affectedRows': 0
        };
        try {
            // Delete row from Database
            const deleteQuery = await db.query(
                `DELETE FROM shopping_cart_item WHERE idshopping_cart_item = ?;`, [cartItemId]
            );
            console.log(deleteQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shoppingcart row is inserted, >= 1 is used only for debugging purposes
            if(deleteQuery.affectedRows >= 1) {
                // Send affected rows count
                data.affectedRows = deleteQuery.affectedRows;
            } else if (deleteQuery.affectedRows === 0) {
                data.affectedRows = deleteQuery.affectedRows;
            } else {
                data.affectedRows = -1;
            }
        } catch (err) {
            // Debug error in case where try/catch fails
            console.log(err);
        }
        return data;
    },
};
  