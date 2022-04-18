const db = require("../config/db.js");

module.exports = {
    async getByOwner(restaurantId){
        
        // Default values for return Object
        let data = {
            'status': 400,
            orderInfo: null
        }
        try {
            // Get order row from database
            const getQuery = await db.query(
                `SELECT delivery_address,\`order_history_id\`,\ \`idorder\`,\ \`timestamp\`,\ \`total\`,\ \`restaurant\`.\`idrestaurant\`,\ \`restaurant\`.\`name\`,\ \`order_history_item\`.\`name\`,\ \`order_history_item\`.\`description\`,\ \`order_history_item\`.\`price\`,\ \`order_history_item\`.\`category\`,\ \`order_history_item\`.\`quantity\`,\ \`user\`.\`firstname\`,\ \`user\`.\`lastname\`,\ \`user\`.\`address\` FROM \`order_history\` INNER JOIN \`restaurant\` ON \`order_history\`.\`restaurant_id\` =\ \`restaurant\`.\`idrestaurant\` INNER JOIN \`order_history_item\` ON \`order_history\`.\`idorder_history\` = \`order_history_item\`.\`order_history_id\` INNER JOIN \`user\` ON \`order_history\`.\`user_id\` = \`user\`.\`iduser\`  WHERE \`restaurant\`.\`idrestaurant\` =? `,
                [restaurantId]
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one order row are inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get order info from query result
                data.orderInfo = getQuery;
                // Set HTTP status code == success
                data.status = 200;
                
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status == 500;
        }
        //console.log(data.status);
        return data;
    },
    async get(userId, orderId){
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
            orderInfo: null
        }
        try {
            // Get order row from database
            const getQuery = await db.query(
                `SELECT \`order_history_id\`,\ \`idorder\`,\ \`timestamp\`,\ \`total\`,\ \`restaurant\`.\`idrestaurant\`,\ \`restaurant\`.\`name\`,\ \`order_history_item\`.\`name\`,\ \`order_history_item\`.\`description\`,\ \`order_history_item\`.\`price\`,\ \`order_history_item\`.\`category\`,\ \`order_history_item\`.\`quantity\` FROM \`order_history\` INNER JOIN \`restaurant\` ON \`order_history\`.\`restaurant_id\` =\ \`restaurant\`.\`idrestaurant\` INNER JOIN \`order_history_item\` ON \`order_history\`.\`idorder_history\` = \`order_history_item\`.\`order_history_id\` WHERE \`user_id\` =? AND \`idorder_history\` =? `,
                [userId, orderId]
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one order row are inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get order info from query result
                data.orderInfo = getQuery;
                // Set HTTP status code == success
                data.status = 200;
                
            }
        } catch (err){
            // Debug error in case where try/catch fails
            console.log(err);
            // Set HTTP status code == Internal server error
            data.status == 500;
        }
        //console.log(data.status);
        return data;
    },
    
    

    async create(historyData){
        // Default values for return Object
        let data = {
            'affectedRows': 0
        }
        try {

            const createQuery = await db.query(
                `INSERT INTO order_history_item(name,description,price,category,order_history_id,quantity) VALUES(?,?,?,?,?,?)`,
                [historyData.name, historyData.description, historyData.price, historyData.category, historyData.order_history_id, historyData.quantity]
            );
            
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
}; 