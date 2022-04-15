const db = require("../config/db.js");

module.exports = {
    async get(restaurantId){
        /**
         * Error codes:
         * 0: Query succesful
         * 1: Query failed
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            itemInfo: []
        }
        try {
            // Get item info from database
            const getQuery = await db.query(
                'SELECT `iditem`, `name`, `description`, `price`, `image_path`, `category` FROM `item` WHERE `restaurant_id`=?',
                [restaurantId]
            );
            // Result can be empty and still be correct
            if(getQuery.length >= 0){
                // Get item info from query result
                data.itemInfo = getQuery;
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

    async create(userId,itemData){
        /**
         * Error codes:
         * 0: Item created succesful
         * 1: Failed to create item
         * 2: Unknown error
         */
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
         * Error codes:
         * 0: Item deleted succesfully
         * 1: Failed to delete item
         * 2: Unknown error / server error
         */
        // Default values for return Object
        let data = {
            errorCode: 0,
            success: false
        }
        try {
            // Delete row from database
            const deleteQuery = await db.query(
                'DELETE from `item` WHERE `iditem`=?',
                [itemId]
            );
            if(deleteQuery.affectedRows == 1){
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
    
    async modify(itemId, itemData){
        /**
         * Error codes:
         * 0: Item modified succesfully
         * 1: Failed to modify item
         * 2: Unknown error
         * 3: No values selected
         */

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
        if(updateTerms.length > 0){
            // Create raw SQL from itemData values
            updateString = 'UPDATE `item` SET ? WHERE `iditem`=? AND `restaurant_id`=?';
            try {
                // Update database row
                const updateQuery = await db.query(
                    updateString,
                    [
                        updateTerms.join(', '),
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
        } else {
            data.errorCode = 3;
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