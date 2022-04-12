const express = require('express');
const router = express.Router();
const authentication = require('../model/authentication.js');
const parser = require('../utils/requestParser.js');
const auth = require('../middleware/auth.js');

// Refresh access token
router.post('/refresh-token', async function(req, res){
    let refreshToken = req.body.refreshToken;
    let userId = req.body.userId;
    if( refreshToken && userId ){
        data = await authentication.refreshAccesToken(
            req.body.userId,
            req.body.refreshToken
        )
        if(
            data.success == true
            && data.errorCode == 0
            && data.accessToken != null
        ){
            return res.status(200).send({
                'accessToken': data.accessToken
            })
        } else {
            if(data.errorCode == 1){
                return res.status(404).send({
                    'errorCode': 1,
                    'message': 'No active token found'
                })
            }
        }
    } else {
        return res.status(400).send({
            'message': 'Missing required data'
        })
    }
    return res.status(500).send({
        'message': 'Unknown error'
    })
});

module.exports = router;