const db = require("../config/db");

module.exports = {
    async get(userId){
         /**
        * Example success response from database query
        * [
             RowDataPacket {
             timestamp: 2022-03-22T21:59:08.000Z,
             total: 15,
             idrestaurant: 6,
            name: 'Tattikeitto',
            description: 'Alkupalat',
             price: 15,
            category: 'fastfood',
            quantity: 2
  }
]
   */    
        // Default values for return Object
        let data = {
            'status': 400,
            orderHistoryInfo: null
        }
        try {
            // Get orderHistory rows from database
            const getQuery = await db.query(
                `SELECT \`timestamp\`,\ \`total\`,\ \`restaurant\`.\`idrestaurant\`,\ \`restaurant\`.\`name\`,\ \`order_history_item\`.\`name\`,\ \`order_history_item\`.\`description\`,\ \`order_history_item\`.\`price\`,\ \`order_history_item\`.\`category\`,\ \`order_history_item\`.\`quantity\` FROM \`order_history\` INNER JOIN \`restaurant\` ON \`order_history\`.\`restaurant_id\` =\ \`restaurant\`.\`idrestaurant\` INNER JOIN \`order_history_item\` ON \`order_history\`.\`idorder_history\` = \`order_history_item\`.\`order_history_id\` WHERE \`user_id\` =${userId}  `
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one order row are inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get order info from query result
                data.orderHistoryInfo = getQuery;
                // Set HTTP status code == success
                data.status = 200;
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status = 500;
        }
        //console.log(data.status);
        return data;
    },

    async create(orderHistoryData){
        // Default values for return Object
        let data = {
            'status': 400,
            'orderHistoryId': null
        }
        try {
            // Insert row into database
            const createQuery = await db.query(
                `INSERT INTO \`order_history\`(\
                    \`total\`,\
                    \`restaurant_id\`,\
                    \`user_id\`\             
                ) VALUES (\
                    '${orderHistoryData.total}',\
                    '${orderHistoryData.restaurantId}',\
                    '${orderHistoryData.userId}'\
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

}; 