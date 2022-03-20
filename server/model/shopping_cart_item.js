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

    async create(shoppingCartItemData) {
        /**
         *  Example response from database insert query:
         * {
         *      fieldCount: 0,
         *      affectedRows: 1,
         *      insertId: 1,
         *      serverStatus: 2,
         *      warningCount: 0,
         *      message: '',
         *      protocol41: true,
         *      changedRows: 0
         *   }
         */
        // Default values for return Object
        var data = {
            'status': 400,
            'shoppingCartItemId': null
        };
        try {
            // Insert row into Database
            const createQuery = await db.query(
                `INSERT INTO \`shopping_cart_item\`(\
                    \`item_id\`,\
                    \`shopping_cart_id\`,\
                    \`quantity\`\
                ) VALUES (\
                    ${shoppingCartItemData.item_id},\
                    ${shoppingCartItemData.shopping_cart_id},\
                    ${shoppingCartItemData.quantity}\
                )`
            );
            // If affected rows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shopping_cart_item row are inserted, >= 1 is used only for debugging purposes
            if(createQuery.affectedRows >= 1) {
                data.shoppingCartItemId = createQuery.insertId;
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

    async modify(shoppingCartItemId, shoppingCartItemData) {
        /**
         * Example success response from update query
         * OkPacket {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 0,
                serverStatus: 2,
                warningCount: 0,
                message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                protocol41: true,
                changedRows: 1
            }
         */
        // Default values for return Object
        data = {
            'status': 400
        }

        // Build query string
        updateTerms = [];
        if(shoppingCartItemData.item_id != null){
            updateTerms.push(`\`item_id\`='${shoppingCartItemData.item_id}'`);
        }
        if(shoppingCartItemData.shopping_cart_id != null){
            updateTerms.push(`\`shopping_cart_id\`='${shoppingCartItemData.shopping_cart_id}'`);
        }
        if(shoppingCartItemData.quantity != null){
            updateTerms.push(`\`quantity\`='${shoppingCartItemData.quantity}'`);
        }
        // Create raw SQL from userData values
        updateString = `UPDATE \`shopping_cart_item\` SET ${updateTerms.join(', ')} WHERE \`idshopping_cart_item\`=${shoppingCartItemId}`

        try {
            // Update database row
            const updateQuery = await db.query(
                updateString
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one shopping_cart_item row are inserted, >= 1 is used only for debugging purposes
            if(updateQuery.affectedRows >= 1){
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
    }
}