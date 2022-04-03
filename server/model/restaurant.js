const db = require("../config/db.js");
const { testTruncate } = require("./user.js");

module.exports = {
    async getAll(){
        /**
         * Error codes:
         * 0: Query succesful
         * 1: No restaurants found
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            restaurants: []
        }
        try {
            const getQuery = await db.query(
                'SELECT `idrestaurant` AS "id",`name`,`address`,`opening_hours`,`image_path`,`restaurant_type`,`price_level` FROM `restaurant`'
            )
            if(getQuery.length > 0){
                for(let x=0; x<getQuery.length; x++){
                    data.restaurants.push(
                        // Convert rowDataPacket or whatever weird object query is returning to basic Object
                        Object.assign({}, getQuery[x])
                    )
                }
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err) {
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },

    async getById(restaurantId) {
        /**
         * Error codes:
         * 0: No errors
         * 1: Restaurant not found
         * 2: Unknown error
         */
        var data = {
            errorCode: 0,
            success: false,
            restaurants: []
        }
        try {
            const getQuery = await db.query(
                'SELECT `idrestaurant` AS "id",`name`,`address`,`opening_hours`,`image_path`,`restaurant_type`,`price_level` FROM `restaurant` WHERE `idrestaurant`=?',
                [restaurantId]
            );
            if(getQuery.length == 1) {
                // Convert rowDataPacket or whatever weird object query is returning to basic Object
                data.restaurantInfo = data.restaurants.push(Object.assign({}, getQuery[0]))
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err) {
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },

    async create(userId, restaurantData) {
        /**
         * Error codes:
         * 0: Restaurant created succesfully
         * 1: Restaurant creating failed
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            restaurantId: null
        }
        try {
            const createQuery = await db.query(
                'INSERT INTO `restaurant`(`name`,`address`,`opening_hours`,`image_path`,`restaurant_type`,`price_level`,`user_iduser`) VALUES (?,?,?,?,?,?,?)',
                [
                    restaurantData.name,
                    restaurantData.address,
                    restaurantData.openingHours,
                    restaurantData.imagePath,
                    restaurantData.restaurantType,
                    restaurantData.priceLevel,
                    userId
                ]
            );
            console.log(createQuery);
            if (createQuery.affectedRows == 1) {
                data.restaurantId = createQuery.insertId;
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err) {
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },

    async modify(userId, restaurantId, restaurantData) {
        /**
         * Error codes:
         * 0: Update succesful
         * 1: Update failed
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false
        }
        // Build query string
        updateTerms = [];
        if(restaurantData.name != null) {
            updateTerms.push(
                '`name`="' + restaurantData.name + '"'
            );
        }
        if(restaurantData.address != null) {
            updateTerms.push(
                '`address`="' + restaurantData.address + '"'
            );
        }
        if(restaurantData.opening_hours != null) {
            updateTerms.push(
                '`opening_hours`="' + restaurantData.openingHours + '"'
            );
        }
        if(restaurantData.imagePath != null) {
            updateTerms.push(
                '`image_path`="' + restaurantData.imagePath + '"'
            );
        }
        if(restaurantData.restaurant_type != null) {
            updateTerms.push(
                '`restaurant_type`=' + restaurantData.restaurantType + ''
            );
        }
        if(restaurantData.price_level != null) {
            updateTerms.push(
                '`price_level`=' + restaurantData.priceLevel + ''
            );
        }
        rawSql = 'UPDATE `restaurant` SET ' + updateTerms.join(', ') + 'WHERE `idrestaurant`=' + restaurantId + ' AND `user_iduser`=' + userId;

        try {
            const updateQuery = await db.query(
                rawSql
            );
            if(updateQuery.affectedRows == 1) {
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err) {
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },

    async delete(userId, restaurantId) {
        /**
         * Error codes:
         * 0: Delete succesful
         * 1:
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false
        }
        try {
            // Delete row from Database
            const deleteQuery = await db.query(
                'DELETE FROM `restaurant` WHERE `idrestaurant`=? AND `user_iduser`=?',
                [userId, restaurantId]
            );
            if(deleteQuery.affectedRows >= 1) {
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
}