
process.env.MYSQL_DATABASE='webapp_dev';

const chai = require('chai');
const { assert } = require('chai')

const chaiHttp = require('chai-http');
const server = require('../index.js');
const User = require('../model/user.js');

chai.use(chaiHttp);
let should = chai.should();

async function getUserByUsername(username){
    const data = await User.testGetByUsername(username);
    return data;
}

describe('Test `user` endpoints', () =>{
    before( async () => {
        // Truncate `user` table
        await User.testTruncateRestaurant();
        await User.testTruncateCart();
        await User.testTruncate();
    })

    // Login token
    let token = null;

    /** Test create user */
    let userData = {
        username: 'testuser2',
        password: 'pass123',
        firstName: 'test',
        lastName: 'user',
        address: 'Osoite 123',
        phone: '0401231234',
        isOwner: 0
    }
    describe('POST /user',  () => {
        it('Should create new user', (done) => {
            chai.request(server)
                .post("/user")
                .set('content-type', 'application/json')
                .send(userData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    if(err){
                        console.log(err);
                    } else {
                        done();
                    }
                });
        });
    });
    /** END Test create user */

    /** Test login user */
    let loginData = {
        username: userData.username,
        password: userData.password
    }
    describe('POST /user/login', () => {
        it('Should log user in', (done) => {
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/json')
                .send(loginData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.userData.should.have.property('accessToken');
                    if(err){
                        console.log(err);
                    } else {
                        token = res.body.userData.accessToken;
                        done();
                    }
                });
        });
    });
    /** END Test login user */

    /** Test modify user */
    let modifyData = {
        firstName: 'modifiedFirstname',
        lastName: 'modifiedLastname',
        address: 'modifiedAddress',
        phone: 'modifiedPhone123'
    }
    describe('PUT /user', () => {
        it('Should update user info', (done) => {
            chai.request(server)
                .put('/user')
                .set('content-type', 'application/json')
                .set('authorization', 'Bearer ' + token)
                .send(modifyData)
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    if(err){
                        console.log(err);
                    } else {
                        done();
                    }
                });
        });
    });
    /** END Test modify user */
});