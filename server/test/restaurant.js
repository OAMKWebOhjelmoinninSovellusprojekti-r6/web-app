process.env.MYSQL_DATABASE='webapp_dev';

const chai = require('chai');
const { assert, expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const FormData = require('form-data');
const fs = require('fs');
const http = require('http')

const User = require('../model/user');
chai.use(chaiHttp);

let token = null
const form = new FormData();
const tempImage = fs.createReadStream('./tictactoe.png')
form.append('name', 'Foodory');
form.append('address', 'funstreet 16');
form.append('opening_hours', '9.00-23.00');
form.append('image', tempImage);
form.append('restaurant_type', 1);
form.append('price_level', 2);

var request = http.request({
    method: 'post',
    path: '/uploads',
    headers: form.getHeaders()
});


describe('Restaurant API tests', () => {

    before( async () => {
        // Truncate `user` table
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

    /**Test create restaurant */

    describe('Add a new restaurant', () => {
        it('should add restaurant data when the data is correct', (done) => {
            chai.request(server)
            .post('/restaurant')
            .type('form')
            .set('authorization', 'Bearer ' + token)
            .send(form)
            .end((err, res) => {
                res.should.have.status(201);
                /*
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                */
                done();
            })
        })
    })

    /**END test create restaurant */
})