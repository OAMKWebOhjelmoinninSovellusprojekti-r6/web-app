const express = require('express');
const router = express.Router();
const User = require('../model/user.js')
const parser = require('../utils/requestParser.js');
const auth = require('../middleware/auth.js');

// Create user
router.post('/', async function(req, res){
    console.log('POST, /user');
    let reqData = {}
    reqData.username = req.body.username;
    reqData.password = req.body.password;
    reqData.firstName = req.body.firstName;
    reqData.lastName = req.body.lastName;
    reqData.address = req.body.address;
    reqData.phone = req.body.phone;
    reqData.isOwner = req.body.isOwner;
    if(
        reqData.username
        && reqData.password
        && reqData.firstName
        && reqData.lastName
        && reqData.address
        && reqData.phone
        && reqData.isOwner != null
    ){
        createData = await User.create(reqData);
        if(
            createData.success == true
            && createData.errorCode == 0
        ){
            res.status(200).send({
                'message': 'User created succesfully'
            })
        } else {
            if(createData.errorCode == 1){
                res.status(403).send({
                    'message': 'Username already exists'
                })
            } else {
                res.status(500).send({
                    'message': 'Unknown error'
                })
            }
        }
    } else {
        res.status(400).send({
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
        req.tokenData.userData.id,
        updateValues
    );
    if(
        modifyData.success == true
        && modifyData.errorCode == 0
    ) {
        res.status(200).send({
            'message': 'User updated succesfully'
        });
    } else {
        res.status(500).send({
            'message': 'Unknown error'
        })
    }
});

router.delete('/', auth, async function(req, res){
    let deleteData = await User.delete(req.tokenData.userData.id);
    if(
        deleteData.success == true
        && deleteData.errorCode == 0
    ) {
        res.status(200).send({
            'message': 'User deleted succesfully'
        });
    } else {
        res.status(500).send({
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
            loginData.token != null
        ){
            res.status(200).send({
                'message': 'Login succesful',
                'token': loginData.token
            })
        } else {
            if(loginData.errorCode == 1){
                res.status(403).send({
                    'message': 'Username and password doesnt match'
                })
            } else {
                res.status(500).send({
                    'message': 'Unknown error'
                })
            }
        }
    } else {
        res.status(400).send({
            'message': 'Invalid username or password'
        })
    }
});

module.exports = router;