const db = require('../config/db.js');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

module.exports = class TokenService {
    accessTokenSecret = process.env.TOKEN_SECRET;
    accessTokenExpire = process.env.TOKEN_EXPIRE;

    createAccessToken(userId, shoppingCartId){
        return jwt.sign(
            {
                userData: {
                    userId: userId,
                    shoppingCartId: shoppingCartId,
                }
            },
            this.accessTokenSecret,
            {
                expiresIn: this.accessTokenExpire
            }
        )
    }

    createRefreshToken(){
        let data = {
            validFrom: null,
            validTo: null,
            token: null,
        }
        data.token = randToken.uid(256);
        const dateNow = new Date();
        data.validFrom = dateNow.toISOString().slice(0, 19).replace('T', ' ');
        const dateExpire = dateNow.setHours( dateNow.getHours() + 1 );
        data.validTo = new Date(dateExpire).toISOString().slice(0, 19).replace('T', ' ');
        return data;
    }

    async updateRefreshToken(userId, tokenData){
        try {
            const updateQuery = await db.query(
                'INSERT INTO `active_tokens`(`uid`,`user_id`,`created_at`,`expires`) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE `uid`=?, `created_at`=?, `expires`=?',
                [
                    tokenData.token,
                    userId,
                    tokenData.validFrom,
                    tokenData.validTo,
                    tokenData.token,
                    tokenData.validFrom,
                    tokenData.validTo
                ]
            );
            if(updateQuery.affectedRows > 0){
                return true;
            }
        } catch (err){
            console.log(err);
        }
        return false;
    }
}