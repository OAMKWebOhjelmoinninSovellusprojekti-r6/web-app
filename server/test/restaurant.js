process.env.MYSQL_DATABASE='webapp_dev';

const chai = require('chai');
const { assert, expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const fs = require('fs');
const http = require('http')

const User = require('../model/user');
chai.use(chaiHttp);

let token = null

describe('Restaurant API tests', () => {

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

    /**Test create restaurant */
    let restaurantId = null;

    describe('POST a new restaurant', () => {
        it('should add restaurant data when the data is correct', (done) => {
            chai.request(server)
            .post('/restaurant')
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'Foodory')
            .field('address', 'funstreet 16')
            .field('openingHours', '9,00-23,00')
            .field('restaurantType', '1')
            .field('priceLevel', '2')
            .end((err, res) => {
                res.should.have.status(200);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

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
                done();
                restaurantId = res.body.restaurantId;
            })
        })

        it('should reject request with missing fields from the data structure', (done) => {
            chai.request(server)
            .post('/restaurant')
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'the Mesta')
            .field('address', 'yolokatu 2')
            .field('restaurantType', '2')
            .field('priceLevel', '3')
            .end((err, res) => {
                res.should.have.status(400);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with empty data structure', (done) => {
            chai.request(server)
            .post('/restaurant')
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('restaurantName', 'the Mesta',)
            .field('location', 'yolokatu 2')
            .field('type', '2')
            .field('price', '2')
            .end((err, res) => {
                res.should.have.status(400);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with invalid token', (done) => {
            chai.request(server)
            .post('/restaurant')
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token + 'qwe')
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'Foodory')
            .field('address', 'funstreet 16')
            .field('openingHours', '9,00-23,00')
            .field('restaurantType', '1')
            .field('priceLevel', '2')
            .end((err, res) => {
                res.should.have.status(401);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })

    /**END test create restaurant */

    /**Test modify restaurant */

    describe('Modify a restaurant', () => {
        it('should modify restaurant data when the data is correct', (done) => {
            chai.request(server)
            .put(`/restaurant/${restaurantId}`)
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'Foodory')
            .field('address', 'funstreet 16')
            .field('openingHours', '11,00-20,00')
            .field('restaurantType', '4')
            .field('priceLevel', '1')
            .end((err, res) => {
                res.should.have.status(200);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })
        
        it('should reject request when no valid data is available', (done) => {
            chai.request(server)
            .put(`/restaurant/${restaurantId}`)
            .set('content-type','multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .field('restaurantName', 'Foodory')
            .end((err, res) => {
                res.should.have.status(500);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })


    })
    /**END test modify restaurant */


    /**Test get restaurants */

    describe('GET requests for restaurants', () => {
        it('should return all restaurants', (done) => {
            chai.request(server)
            .get('/restaurant')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should return restaurant by id', (done) => {
            chai.request(server)
            .get(`/restaurant/${restaurantId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array')
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with invalid id', (done) => {
            chai.request(server)
            .get(`/restaurant/qwe`)
            .end((err, res) => {
                res.should.have.status(400);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })
    /**END test get restaurant */


    /** Test delete restaurant*/

    describe('DELETE restaurant', () => {
        it('should delete restaurant with correct id', (done) => {
            chai.request(server)
            .delete(`/restaurant/${restaurantId}`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with invalid token', (done) => {
            chai.request(server)
            .delete(`/restaurant/${restaurantId}`)
            .set('authorization', 'Bearer ' + token + 'qweasd')
            .end((err, res) => {
                res.should.have.status(401);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with invalid id', (done) => {
            chai.request(server)
            .delete(`/restaurant/zxc`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(400);
                if(err){
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })

    /**END delete restaurant */

})



