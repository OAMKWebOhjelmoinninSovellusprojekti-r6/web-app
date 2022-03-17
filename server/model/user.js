const db = require("../config/db.js");
const argon2 = require("argon2");

module.exports = {
    async get(userId){
        /**
         * Example success response from database query
         * [
                RowDataPacket {
                    iduser: 1,
                    username: 'hv',
                    password: '$argon2i$v=19$m=4096,t=3,p=1$chadVlqBXSxLLe6swjvS0g$IPcjHzg28OgmfERFk5O669TxlDLNRynsZeZFd2GM1XQ',
                    firstname: 'henruy',
                    lastname: 'vais',
                    address: 'tie1',
                    phone: '040123123',
                    is_owner: 1,
                    token: null,
                    token_refresh: null
                }
            ]
         */
        // Default values for return Object
        var data = {
            'status': 400,
            userInfo: null
        }
        try {
            // Get user row from database
            const getQuery = await db.query(
                `SELECT * FROM \`user\` WHERE \`iduser\`=${userId}`
            );
            console.log(getQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one user row are inserted, >= 1 is used only for debugging purposes
            if(getQuery.length >= 1){
                // Get user info from query result
                data.userInfo = getQuery[0];
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

    async create(userData){
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
            'userId': null
        }
        try {
            // TODO Create query here that checks if username already exists

            // Encrypt plaintext password with argon2 hashing algorithm
            const encryptedPassword = await argon2.hash(userData.password);
            // Insert row into database
            const createQuery = await db.query(
                `INSERT INTO \`user\`(\
                    \`username\`,\
                    \`password\`,\
                    \`firstname\`,\
                    \`lastname\`,\
                    \`address\`,\
                    \`phone\`,\
                    \`is_owner\`\
                ) VALUES (\
                    '${userData.username}',\
                    '${encryptedPassword}',\
                    '${userData.firstname}',\
                    '${userData.lastname}',\
                    '${userData.address}',\
                    '${userData.phone}',\
                    ${userData.is_owner}\
                )`
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one user row are inserted, >= 1 is used only for debugging purposes
            if(createQuery.affectedRows >= 1){
                // Get returned row's auto increment key (user id)
                data.userId = createQuery.insertId;
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

    async delete(userId){
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
                `DELETE FROM \`user\` WHERE \`iduser\`=${userId}`
            );
            console.log(deleteQuery);
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one user row are inserted, >= 1 is used only for debugging purposes
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
    
    async modify(userId, userData){
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
        if(userData.password != null){
            // TODO Create argon2 hash here from plain text password.
            // Password comparison should be done before this function
        }
        if(userData.firstname != null){
            updateTerms.push(`\`firstname\`='${userData.firstname}'`);
        }
        if(userData.lastname != null){
            updateTerms.push(`\`lastname\`='${userData.lastname}'`);
        }
        if(userData.address != null){
            updateTerms.push(`\`address\`='${userData.address}'`);
        }
        if(userData.phone != null){
            updateTerms.push(`\`phone\`='${userData.phone}'`);
        }
        if(userData.isOwner != null){
            updateTerms.push(`\`is_owner\`=${userData.isOwner}`);
        }
        // Create raw SQL from userData values
        updateString = `UPDATE \`user\` SET ${updateTerms.join(', ')} WHERE \`iduser\`=${userId}`

        try {
            // Update database row
            const updateQuery = await db.query(
                updateString
            );
            // If affectedRows == 1 || >= 1, query was succesful
            // This should always return === 1 since only one user row are inserted, >= 1 is used only for debugging purposes
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