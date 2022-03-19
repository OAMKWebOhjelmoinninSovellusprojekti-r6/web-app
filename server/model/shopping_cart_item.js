const db = require("../config/db.js");

module.exports = {
    async get(shoppingCartItemId) {
        /**
         * Example success response from database query
         * [
                RowDataPacket {
                    idshopping_cart_item: 1,
                    item_id: 1,
                    shopping_cart_id: 1,
                    quantity: 1
                }
            ]
         */
        // Default values for return Object
        var data = {
            'status': 400,
            shoppingCartItemInfo: null
        }
        try {
            // Get shopping_cart_item row from database
            const getQuery = await db.query(
                `SELECT * FROM \`shoppin_cart_item\` WHERE \`idshopping_cart_item\`=${shoppingCartItemId}`
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shoppin_cart_item row are inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1) {
                // Get shopping_cart_item info from query
                data.shoppingCartItemInfo = getQuery[0];
                // Set HTTP status code == success
                data.status = 200;
            }
        } catch (err) {
            //Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status = 500;
        }
        return data;
    },

    async create() {

    },

    async delete(shoppingCartItemId) {
        /**
         * Example success response from delete query
         * {
         *      fieldCount: 0,
         *      affectedRows: 1,
         *      insertId: 0,
         *      serverStatus: 2,
         *      warningCount: 0,
         *      message: '',
         *      protocol41: true,
         *      changedRows: 0
         * }
         */
        // Default values for return Object
        var data = {
            'status': 400
        }
        try {
            // Delete row from database
            const deleteQuery = await db.query(
                `DELETE FROM \`shopping_cart_item\` WHERE \`idshopping_cart_item\`=${shoppingCartItemId}`
            );
            console.log(deleteQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shopping_cart_item row is inserted, >= 1 is used only for debugging purposes
            if(deleteQuery.affectedRows >= 1) {
                // Set HTTP status code == success
                data.status = 200;
            }
        } catch (err) {
            // Debug error in case try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status = 500;
        }
    },

    async modify() {

    }
}