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

    async create(userId,itemData){

        console.log("itemdata", userId, itemData);
        let data = {
            errorCode: 0,
            success: false,
            itemId: null
        }
        try {
            // Insert row into database
            const createQuery = await db.query(
                'INSERT INTO `item`(`name`,`description`,`price`,`image_path`,`category`,`restaurant_id`) VALUES (?,?,?,?,?,?)',
                [
                    itemData.name,
                    itemData.description,
                    itemData.price,
                    itemData.imagePath,
                    itemData.category,
                    itemData.restaurantId,
                    userId
                ]
            );
            if(createQuery.affectedRows == 1){
                // Get returned row's auto increment key (iditem)
                data.itemId = createQuery.insertId;
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
    
    async modify(userId, itemId, itemData){
        let data = {
            errorCode: 0,
            success: false
        }

        // Build query string
        updateTerms = [];
        if(itemData.name != null){
            updateTerms.push(
                '`name`="' + itemData.name + '"'
            );
        }
        if(itemData.description != null){
            updateTerms.push(
                '`description`="' + itemData.description + '"'
            );
        }
        if(itemData.price != null){
            updateTerms.push(
                '`price`=' + itemData.price
            );
        }
        if(itemData.category != null){
            updateTerms.push(
                '`category`="' + itemData.category + '"'
            );
        }
        // Create raw SQL from itemData values
        updateString = 'UPDATE `item` SET ' + updateTerms.join(', ') + ' WHERE `iditem`=? AND `restaurant_id`=?';

        try {
            // Update database row
            const updateQuery = await db.query(
                updateString,
                [
                    itemId,
                    itemData.restaurantId
                ]
            );
            if(updateQuery.affectedRows == 1){
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

    async updateImageUrl(imagePath, itemId){
        let data = {
            errorCode: 0,
            success: false
        }
        try {
            const updateQuery = await db.query(
                'UPDATE `item` SET `image_path`=? WHERE `iditem`=?',
                [
                    imagePath,
                    itemId
                ]
            );
            if(updateQuery.affectedRows > 0){
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err) {
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    }
}; 