const db = require("../config/db.js");

module.exports = {
    async get(cartId){
        let data = {
            errorCode: 0,
            success: false,
            items: []
        }
        try {
            // Get all the items in shopping cart 
            const getQuery = await db.query(
                `SELECT idshopping_cart_item AS idItem, item.name AS itemName, description, price, restaurant.image_path, category, quantity, idrestaurant, restaurant.name AS restaurantName
                FROM shopping_cart
                JOIN shopping_cart_item ON shopping_cart.idshopping_cart = shopping_cart_item.shopping_cart_id
                JOIN item ON item.iditem = shopping_cart_item.item_id
                JOIN restaurant ON restaurant.idrestaurant = item.restaurant_id
                WHERE idshopping_cart = ?;`, [cartId]
            
            );
            if(getQuery.length >= 0){
                for(let x=0; x<getQuery.length; x++){
                    data.items.push(
                        // Convert rowDataPacket or whatever weird object query is returning to basic Object
                        Object.assign({}, getQuery[x])
                    )
                }
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },

    async create(shoppingCartId, shoppingCartData){
        let data = {
            errorCode: 0,
            success: false
        }
        try {
            // Check if item already exists in cart
            const duplicateQuery = await db.query(
                'SELECT * FROM `shopping_cart_item` WHERE `item_id`=? AND `shopping_cart_id`=?',
                [
                    shoppingCartData.itemId,
                    shoppingCartId
                ]
            );
            // if item exists, add item quantity
            if(duplicateQuery.length > 0){
                const updateQuery = await db.query(
                    'UPDATE `shopping_cart_item` SET `quantity`=(`quantity` + 1) WHERE `shopping_cart_id`=? and `item_id`=?',
                    [shoppingCartId, shoppingCartData.itemId]
                );
                if(updateQuery.affectedRows == 1){
                    data.success = true;
                } else {
                    data.errorCode = 1;
                }
            // If item does not exists, create new itm
            } else {
                // Insert row into database
                const createQuery = await db.query(
                    `INSERT INTO shopping_cart_item(item_id,shopping_cart_id,quantity) VALUES(?,?,1);`, 
                    [
                        shoppingCartData.itemId,
                        shoppingCartId
                    ]
                );
                if(createQuery.affectedRows == 1){
                    data.success = true;
                } else {
                    data.errorCode = 2;
                }
            } 
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            errorCode = 3;
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
    }
};
  