const db = require("../config/db.js");
const argon2 = require("argon2");
var jwt = require('jsonwebtoken');

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
            token: null
        }
        try {
            const loginQuery = await db.query(
                'SELECT `iduser`,`password` FROM `user` WHERE `username`=?',
                [username]
            );
            if(loginQuery.length == 1 && argon2.verify(loginQuery[0].password, password)){
                const token = jwt.sign(
                    {
                        userData: {
                            id: loginQuery[0].iduser
                        }
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: process.env.TOKEN_EXPIRE
                    }
                )
                const updateQuery = await db.query(
                    'UPDATE `user` SET `token`=? WHERE `iduser`=?',
                    [token, loginQuery[0].iduser]
                );
                if(updateQuery.affectedRows == 1){
                    data.token = token;
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
                    data.success = true;
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