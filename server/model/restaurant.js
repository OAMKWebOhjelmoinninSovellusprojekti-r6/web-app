const db = require("../config/db.js");

module.exports = {
    async get(restaurantId) {
        /**
         * Example success response from database query
         * [
                RowDataPacket {
                    idrestaurant: 1,
                    name: 'restobar',
                    address: 'street 15',
                    opening_hours: '9.00-23.00',
                    image_path: 'https://imagelocation.jpg',
                    restaurant_type: 1,
                    price_level: 1,
                    user_iduser: 1,
                }
            ]
         */
        // Default values for return Object
        var data = {
            'status': 400,
            restaurantInfo: null
        }
        try {
            // Get restaurant row from Database
            const getQuery = await db.query(
                `SELECT * FROM \`restaurant\` WHERE \`idrestaurant\`=${restaurantId}`
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one restaurant row are inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1) {
                // Get restaurant info from query
                data.restaurantInfo = getQuery[0];
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

    async create(restaurantData) {
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
            'restaurantId': null
        }
        try {
            // Insert row into Database
            const createQuery = await db.query(
                `INSERT INTO \`restaurant\`(\
                    \`name\`,\
                    \`address\`,\
                    \`opening_hours\`,\
                    \`image_path\`,\
                    \`restaurant_type\`,\
                    \`price_level\`,\
                    \`user_iduser\`\
                ) VALUES (\
                    '${restaurantData.name}',\
                    '${restaurantData.address}',\
                    '${restaurantData.opening_hours}',\
                    '${restaurantData.image_path}',\
                    ${restaurantData.restaurant_type},\
                    ${restaurantData.price_level},\
                    ${restaurantData.user_iduser}\
                )`
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one restaurant row are inserted, >= 1 is used only for debugging purposes
            if (createQuery.affectedRows >= 1) {
                // Get returned row's auto increment key (restaurant id)
                data.restaurantId = createQuery.insertId;
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

    async delete(restaurantId) {
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
            // Delete row from Database
            const deleteQuery = await db.query(
                `DELETE FROM \`restaurant\` WHERE \`idrestaurant\`=${restaurantId}`
            );
            console.log(deleteQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one restaurant row are inserted, >= 1 is used only for debugging purposes
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

    async modify(restaurantId, restaurantData) {
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
        if(restaurantData.name != null) {
            updateTerms.push(`\`name\`='${restaurantData.name}'`);
        }
        if(restaurantData.address != null) {
            updateTerms.push(`\`address\`='${restaurantData.address}'`);
        }
        if(restaurantData.opening_hours != null) {
            updateTerms.push(`\`opening_hours\`='${restaurantData.opening_hours}'`);
        }
        if(restaurantData.image_path != null) {
            updateTerms.push(`\`image_path\`='${restaurantData.image_path}'`);
        }
        if(restaurantData.restaurant_type != null) {
            updateTerms.push(`\`restaurant_type\`=${restaurantData.restaurant_type}`);
        }
        if(restaurantData.price_level != null) {
            updateTerms.push(`\`price_level\`=${restaurantData.price_level}`);
        }
        if(restaurantData.user_iduser != null) {
            updateTerms.push(`\`user_iduser\`=${restaurantData.user_iduser}`);
        }

        updateString = `UPDATE \`restaurant\` SET ${updateTerms.join(', ')} WHERE \`idrestaurant\`=${restaurantId}`
        try {
            // Update database Row
            const updateQuery = await db.query(
                updateString
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one restaurant row are inserted, >= 1 is used only for debugging purposes
            if(updateQuery.affectedRows >= 1) {
                data.status = 200;
            }
        } catch (err) {
            // Debug error in case of try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status = 500;
        }
        return data;
    }
}