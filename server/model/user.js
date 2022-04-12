const db = require("../config/db.js");
const argon2 = require("argon2");
const TokenService = require("../services/tokenService.js");
const ts = new TokenService();

module.exports = {
    async getById(userId){
        /**
         * Error codes:
         * 0: User found
         * 1: User not found
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            userData: {}
        }
        try {
            const getQuery = await db.query(
                'SELECT `firstname`, `lastname`, `address`, `phone`, `is_owner` FROM `user` WHERE `iduser`=?',
                [userId]
            );
            if(getQuery.length == 1){
                userData.firstName = getquery[0].firstname;
                userData.lastName = getquery[0].lastname;
                userData.address = getquery[0].address;
                userData.phone = getquery[0].phone;
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
    
    async login(username, password){
        /** Error codes:
         *  0: Login success
         *  1: Username or password doesnt match
         *  2: Failed to update token
         *  3: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            userData: null
        }
        try {
            const loginQuery = await db.query(
                'SELECT a1.`iduser`, a1.`password`, a1.`firstname`, a1.`lastname`, a1.`is_owner`, a2.`idshopping_cart` FROM `user` a1 LEFT JOIN `shopping_cart` a2 ON a1.`iduser`=a2.`user_id` WHERE `username`=?',
                [username]
            );
            if(loginQuery.length == 1 && argon2.verify(loginQuery[0].password, password)){
                const accessToken = ts.createAccessToken(
                    loginQuery[0].iduser,
                    loginQuery[0].idshopping_cart
                )
                const refreshTokenData = ts.createRefreshToken();
                const tokenQuery = await db.query(
                    'INSERT INTO `active_tokens`(`uid`,`user_id`,`created_at`,`expires`) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE `uid`=?, `created_at`=?, `expires`=?',
                    [
                        refreshTokenData.token,
                        loginQuery[0].iduser,
                        refreshTokenData.validFrom,
                        refreshTokenData.validTo,
                        refreshTokenData.token,
                        refreshTokenData.validFrom,
                        refreshTokenData.validTo
                    ]
                );
                console.log(tokenQuery);
                if(tokenQuery.affectedRows >= 1){
                    let userData = {};
                    userData.accessToken = accessToken;
                    userData.refreshToken = refreshTokenData.token;
                    userData.firstName = loginQuery[0].firstname;
                    userData.lastName = loginQuery[0].lastname;
                    userData.isOwner = loginQuery[0].is_owner;
                    data.userData = userData;
                    data.success = true;
                } else {
                    data.errorCode = 2;
                }
            } else {
                data.errorCode = 1;
            }
        } catch (err){
            console.log(err);
            data.errorCode = 3;
        }
        return data;
    },

    async create(userData){
        /**
         * Error codes:
         * 0: User created succesfully
         * 1: Username already exists
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false
        }
        try {
            const existQuery = await db.query(
                'SELECT `iduser` fROM `user` WHERE `username`=?',
                [userData.username]
            );
            if(existQuery.length > 0){
                data.errorCode = 1;
            } else {
                // Encrypt plaintext password with argon2 hashing algorithm
                const encryptedPassword = await argon2.hash(userData.password);
                // Insert row into database
                const createQuery = await db.query(
                    'INSERT INTO `user`(`username`,`password`,`firstname`,`lastname`,`address`,`phone`,`is_owner`) VALUES (?,?,?,?,?,?,?)',
                    [
                        userData.username,
                        encryptedPassword,
                        userData.firstName,
                        userData.lastName,
                        userData.address,
                        userData.phone,
                        userData.isOwner
                    ]
                );
                if(createQuery.affectedRows == 1){
                    const cartQuery = await db.query(
                        'INSERT INTO `shopping_cart`(`user_id`) VALUES (?)',
                        [
                            createQuery.insertId
                        ]
                    );
                    if(cartQuery.affectedRows == 1){
                        data.success = true;
                    } else {
                        errorCode = 3;
                    }
                } else {
                    errorCode = 4;
                }
            }
        } catch (err){
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },
    
    async modify(userId, userData){
        /**
         * Error codes:
         * 0: User modify succesful
         * 1: Update query failed
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false
        }
        // Build query string
        updateTerms = []
        if(userData.firstName != null){
            updateTerms.push(
                '`firstName`="' + userData.firstName + '"'
            );
        }
        if(userData.lastName != null){
            updateTerms.push(
                '`lastName`="' + userData.lastName + '"'
            );
        }
        if(userData.address != null){
            updateTerms.push(
                '`address`="' + userData.address + '"'
            );
        }
        if(userData.phone != null){
            updateTerms.push(
                '`phone`="' + userData.phone + '"'
            );
        }
        // Create raw SQL from userData values
        if(updateTerms.length <= 0){
            data.errorCode = 4;
        } else {
            updateString = `UPDATE \`user\` SET ${updateTerms.join(', ')} WHERE \`iduser\`=${userId}`
            try {
                const updateQuery = await db.query(
                    updateString
                );
                if(updateQuery.affectedRows == 1){
                    data.success = true;
                } else {
                    data.errorCode = 1;
                }
            } catch (err){
                console.log(err);
                data.errorCode = 2;
            }
        }
        return data;
    },

    async delete(userId){
        /**
         * Error codes:
         * 0: User deleted succesfully
         * 1: User delete failed
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false
        }
        try {
            const deleteQuery = await db.query(
                'DELETE FROM `user` WHERE `iduser`=?',
                [userId]
            );
            if(deleteQuery.affectedRows == 1){
                data.success = true;
            } else {
                data.errorCode = 1;
            }
        } catch (err){
            console.log(err);
            data.errorCode = 2;
        }
        return data;
    },

    /** Testing and debugging functions **/

    async testTruncate(){
        try {
            const truncateQuery = await db.query('DELETE FROM `user`');
        } catch (err){
            console.log(err);
        }
    },

    async testGetByUsername(username){
        /**
         * Error codes:
         * 0: User query succesful
         * 1: User not found
         * 2: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            userData: null
        }
        try {
            const getQuery = await db.query(
                'SELECT * FROM `user` WHERE `username`=?',
                [username]
            );
            if(getQuery.length == 1){
                data.userData = Object.assign({}, getQuery[0]);
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