process.env.MYSQL_DATABASE='webapp_dev';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const fs = require('fs');

const TruncateData = require('./testTruncate');
chai.use(chaiHttp);

describe('Shopping cart API tests', () => {

    before( async () => {
        // Truncate `user` table
        await TruncateData.truncateData();
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
        isOwner: 1
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
    let restaurantId = null;

    describe('POST restaurant request', () => {
        it('should add restaurant data when the data is correct', (done) => {
            chai.request(server)
            .post('/restaurant')
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'the Mesta')
            .field('address', 'yolokatu 2')
            .field('openingHours', '9,00-01,00')
            .field('restaurantType', '2')
            .field('priceLevel', '3')
            .end((err, res) => {
                res.should.have.status(200);
                if(err) {
                    console.log(err);
                } else {
                    done();
                    restaurantId = res.body.restaurantId;
                }
            })
        })
    })

    /**END test create restaurant */

    /**Test create item */
    let itemId = null;

    describe('POST item request', () => {
        it('should add item data when data is correct', (done) => {
            chai.request(server)
            .post('/item')
            .set('content-type', 'multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('imagePath', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'the Burger')
            .field('description', 'delicious dish')
            .field('price', 4.99)
            .field('category', 'burgers')
            .field('restaurantId', restaurantId)
            .end((err, res) => {
                res.should.have.status(200);
                if(err) {
                    console.log(err);
                } else {
                    done();
                    itemId = res.body.itemId;
                }
            })
        })
    })

    /**END test create item */

})