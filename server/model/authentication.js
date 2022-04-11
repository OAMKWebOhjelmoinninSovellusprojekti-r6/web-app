const db = require("../config/db.js");
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const TokenService = require("../services/tokenService.js");
const ts = new TokenService();

module.exports = {
    async refreshAccesToken(userId, refreshToken){
        /**
         * Error codes:
         * 0: User found
         * 1: Refresh token not found
         * 2: Failed to create new refresh token
         * 3: Unknown error
         */
        let data = {
            errorCode: 0,
            success: false,
            accessToken: null
        }
        try {
            const verifyQuery = await db.query(
                'SELECT * FROM `active_tokens` WHERE `user_id`=? AND `uid`=? AND `expires` > NOW()',
                [
                    userId,
                    refreshToken
                ]
            );
            if(verifyQuery.length == 1){
                const tokenData = ts.createRefreshToken();
                if(ts.updateRefreshToken(userId, tokenData)){
                    data.success = true;
                    data.accessToken = ts.createAccessToken(
                        userId,
                        2
                    );
                } else {
                    data.errorCode = 2;
                }
            } else {
                data.errorCode = 1;
            }
        } catch (err) {
            console.log(err);
            data.errorCode = 3;
        }
        return data;
    }
}; 