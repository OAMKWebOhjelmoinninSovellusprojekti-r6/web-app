const db = require("../config/db.js");

module.exports = {
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
                `SELECT \`order_history_id\`,\ \`idorder\`,\ \`timestamp\`,\ \`total\`,\ \`restaurant\`.\`idrestaurant\`,\ \`restaurant\`.\`name\`,\ \`order_history_item\`.\`name\`,\ \`order_history_item\`.\`description\`,\ \`order_history_item\`.\`price\`,\ \`order_history_item\`.\`category\`,\ \`order_history_item\`.\`quantity\` FROM \`order_history\` INNER JOIN \`restaurant\` ON \`order_history\`.\`restaurant_id\` =\ \`restaurant\`.\`idrestaurant\` INNER JOIN \`order_history_item\` ON \`order_history\`.\`idorder_history\` = \`order_history_item\`.\`order_history_id\` WHERE \`user_id\` = ${userId} AND \`idorder_history\` =${orderId} `
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

    async create(userId){
        // Default values for return Object
        let data = {
            'status': 400,
            'orderId': null
        }
        try {
            // Insert row into database
            const historyIdQuery = await db.query(`SELECT \`idorder_history\` FROM \`order_history\` WHERE \`iduser\`=${userId}`)
            
            let historyId = historyIdQuery[0].idorder_history;

            const shoppingCartQuery = await db.query(`SELECT \`item_id\` FROM \`shopping_cart_item\` LEFT JOIN \`shopping_cart\` ON \`shopping_cart_item\`.\`shopping_cart_id\`=\`shopping_cart\`.\`idshopping_cart\` WHERE \`shopping_cart\`.\`user_id\`=${userId}`)
           
            let itemIds = [];
            for(let x=0;x<shoppingCartQuery.length;x++){
                itemIds.push(shoppingCartQuery[x]);
                }

            const createQuery = await db.query(
                `INSERT INTO \`order_history_item\`(
                    \`name\`,\
                    \`description\`,\
                    \`price\`,\
                    \`category\`,\ 
                    \`order_history_id\`,\
                    \`quantity\`\               
                ) SELECT \`item\`.\`name\`,\
                 \`item\`.\`description\`,\
                 \`item\`.\`price\`,\
                \`item\`.\`category\`,\ 
                ${historyId},\
                \`item\`.\`quantity\`,\ 
                 FROM \`item\`  WHERE \`iditem\` IN (${itemIds})`
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