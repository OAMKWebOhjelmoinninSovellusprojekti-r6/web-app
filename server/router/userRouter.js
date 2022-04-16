const express = require('express');
const router = express.Router();
const User = require('../model/user.js')
const parser = require('../utils/requestParser.js');
const auth = require('../middleware/auth.js');

// Create user
router.post('/', async function(req, res){
    console.log(req.body);
    let reqData = {}
    reqData.username = parser.parseString(req.body.username, 20);
    reqData.password = parser.parseString(req.body.password, 256);
    reqData.firstName = parser.parseString(req.body.firstName, 20);
    reqData.lastName = parser.parseString(req.body.lastName, 20);
    reqData.address = parser.parseString(req.body.address, 20);
    reqData.phone = parser.parseString(req.body.phone, 20);
    reqData.isOwner = parser.parseUserType(req.body.isOwner);
    if(
        reqData.username != null 
        && reqData.password != null 
        && reqData.firstName != null 
        && reqData.lastName != null 
        && reqData.address != null 
        && reqData.phone != null
        && reqData.isOwner != null
    ){
        const createData = await User.create(reqData);
        if(
            createData.success == true
            && createData.errorCode == 0
        ){
            return res.status(200).send({
                'message': 'User created succesfully',
                'cartId': createData.cartId
            })
        } else {
            if(createData.errorCode == 1){
                return res.status(403).send({
                    'message': 'Username already exists'
                })
            } else {
                return res.status(500).send({
                    'message': 'Unknown error'
                })
            }
        }
    } else {
        return res.status(400).send({
            'message': 'Missing required data'
        })
    }
});

router.put('/', auth, async function(req, res){
    let updateValues = {
        firstName: parser.parseString(req.body.firstName, 20),
        lastName: parser.parseString(req.body.lastName, 20),
        address: parser.parseString(req.body.address, 20),
        phone: parser.parseString(req.body.phone, 20),
    }
    let modifyData = await User.modify(
        req.tokenData.userData.userId,
        updateValues
    );
    if(
        modifyData.success == true
        && modifyData.errorCode == 0
    ) {
        return res.status(200).send({
            'message': 'User updated succesfully'
        });
    } else {
        if(modifyData.errorCode == 4){
            return res.status(400).send({
                'message': 'Need at least one parameter to modify'
            })
        }
    }
    return res.status(500).send({
        'message': 'Unknown error'
    });
});

router.delete('/', auth, async function(req, res){
    let deleteData = await User.delete(req.tokenData.userData.userId, req.tokenData.userData.shoppingCartId);
    if(
        deleteData.success == true
        && deleteData.errorCode == 0
    ) {
        return res.status(200).send({
            'message': 'User deleted succesfully'
        });
    } else {
        return res.status(500).send({
            'message': 'Unknown error'
        });
    }
});

router.post('/login', async function(req, res){
    const username = parser.parseString(req.body.username, 20);
    const password = parser.parseString(req.body.password, 20);
    if(username && password){
        loginData = await User.login(username, password);
        if(
            loginData.success == true &&
            loginData.errorCode == 0 &&
            loginData.userData != null
        ){
            return res.status(200).send({
                'message': 'Login succesful',
                'userData': loginData.userData
            });
        } else {
            if(loginData.errorCode == 1){
                return res.status(403).send({
                    'message': 'Username and password doesnt match'
                });
            } else {
                return res.status(500).send({
                    'message': 'Unknown error'
                });
            }
        }
    } else {
        return res.status(400).send({
            'message': 'Invalid username or password'
        });
    }
});

module.exports = router;