const db = require("../config/db.js");

module.exports = {
    async get(restaurantId){
        /*
         * Example success response from database query
         * [
                RowDataPacket {
                    iditem: 1,
                    name: 'superpizza',
                    description: 'kebabmajoneesi',
                    price: '7',
                    image_path: 'serveri.com/kuva1',
                    category: 'roska',
                    restaurant_id: 1,
                }
            ]
         */
        // Default values for return Object
        var data = {
            'status': 400,
            itemInfo: null
        }
        try {
            // Get item info from database
            const getQuery = await db.query(
                `SELECT * FROM \`item\` WHERE \`restaurant_id\`=${restaurantId}`
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one item row is inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get item info from query result
                data.itemInfo = getQuery;
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

    async create(itemData){
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
            'itemId': null
        }
        try {

            // Insert row into database
            const createQuery = await db.query(
                `INSERT INTO \`item\`(\
                    \`name\`,\
                    \`description\`,\
                    \`price\`,\
                    \`image_path\`,\
                    \`category\`,\
                    \`restaurant_id\`\
                ) VALUES (\
                    '${itemData.name}',\
                    '${itemData.description}',\
                    '${itemData.price}',\
                    '${itemData.image_path}',\
                    '${itemData.category}',\
                     ${itemData.restaurant_id}\

                )`
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one item row is inserted, >= 1 is used only for debugging purposes
            if(createQuery.affectedRows >= 1){
                // Get returned row's auto increment key (iditem)
                data.itemId = createQuery.insertId;
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

    async delete(itemId){
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
                `DELETE FROM \`item\` WHERE \`iditem\`=${itemId}`
            );
            console.log(deleteQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one item row is inserted, >= 1 is used only for debugging purposes
            if(deleteQuery.affectedRows >= 1){
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
    
    async modify(itemId, itemData){
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
      
        if(itemData.name != null){
            updateTerms.push(`\`name\`='${itemData.name}'`);
        }
        if(itemData.description != null){
            updateTerms.push(`\`description\`='${itemData.description}'`);
        }
        if(itemData.price != null){
            updateTerms.push(`\`price\`='${itemData.price}'`);
        }
        if(itemData.image_path != null){
            updateTerms.push(`\`image_path\`='${itemData.image_path}'`);
        }
        if(itemData.category != null){
            updateTerms.push(`\`category\`=${itemData.category}`);
        }
        if(itemData.restaurant_id != null){
            updateTerms.push(`\`restaurant_id\`=${itemData.restaurant_id}`);
        }
        // Create raw SQL from itemData values
        updateString = `UPDATE \`item\` SET ${updateTerms.join(', ')} WHERE \`iditem\`=${itemId}`

        try {
            // Update database row
            const updateQuery = await db.query(
                updateString
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one item row is inserted, >= 1 is used only for debugging purposes
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
    },
}; 