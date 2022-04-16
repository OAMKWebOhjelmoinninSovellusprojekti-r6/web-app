process.env.MYSQL_DATABASE='webapp_dev';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const fs = require('fs');

const TruncateData = require('./testTruncate');
const { describe } = require('mocha');
chai.use(chaiHttp);

describe('History API tests', () => {

    before( async () => {
        // Truncate `user` table
        await TruncateData.truncateData();
    })

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
                        cartId = res.body.cartId
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
                     restaurantId = res.body.restaurantId;
                     done();
                 }
             })
         })
     })
 
     /**END test create restaurant */

     
     /**Test create order history */
     let orderHistoryId = null;

     describe('POST order history request', () => {
         it('should create order history when data is correct', (done) => {
            chai.request(server)
            .post('/history')
            .set('content-type','application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                total: 25.99,
                restaurantId: restaurantId,
                userId: token.userId
            })
            .end((err, res) => {
                res.should.have.status(200);
                if(err){
                    console.log(err);
                } else {
                    orderHistoryId = res.body.idorder_history;
                    done();
                }
            })
         })
     })
     /**END test order history */


     /** Test create order history item */

     describe('POST order history item request', () => {
        it('should create order history item when data is correct', (done) => {
           chai.request(server)
           .post('/historyItem')
           .set('content-type','application/json')
           .set('authorization', 'Bearer ' + token)
           .send({
               name: 'kerrosburger',
               description: 'delicious',
               price: 5.99,
               category: 'burgers',
               order_history_id: orderHistoryId,
               quantity: 2
           })
           .end((err, res) => {
                res.should.have.status(200);
                if(err){
                    console.log(err);
                } else {
                   done();
                }
           })
        })

        it('should reject request with incorrect data type', (done) => {
            chai.request(server)
            .post('/historyItem')
            .set('content-type','application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                name: 'kerrosburger',
                description: 5,
                price: 'alot of money',
                category: 'burgers',
                order_history_id: orderHistoryId,
                quantity: 2
            })
            .end((err, res) => {
                 res.should.have.status(400);
                 if(err){
                     console.log(err);
                 } else {
                    done();
                 }
            })
        })

        it('should reject request with missing data', (done) => {
            chai.request(server)
            .post('/historyItem')
            .set('content-type','application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                name: 'kerrosburger',
                description: 5,
                price: 'alot of money',
                order_history_id: orderHistoryId,
                quantity: 2
            })
            .end((err, res) => {
                 res.should.have.status(400);
                 if(err){
                     console.log(err);
                 } else {
                    done();
                 }
            })
        })

        it('should reject request with invalid token data', (done) => {
            chai.request(server)
            .post('/historyItem')
            .set('content-type','application/json')
            .set('authorization', 'Bearer ' + token + "qdqf")
            .send({
                name: 'kerrosburger',
                description: 'delicious',
                price: 5.99,
                category: 'burgers',
                order_history_id: orderHistoryId,
                quantity: 2
            })
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
     /**END test create order histort item */


     /**Test get history items */

     describe('GET order history item request', () => {
        it('should get order history item when data is correct', (done) => {
           chai.request(server)
           .get('/history')
           .set('content-type','application/json')
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

        it('should reject with invalid token data', (done) => {
            chai.request(server)
            .get('/history')
            .set('content-type','application/json')
            .set('authorization', 'Bearer ' + token + "awe")
            .end((err, res) => {
                 res.should.have.status(401);
                 if(err){
                     console.log(err);
                 } else {
                    done();
                 }
            })
        })

        it('should reject request with invalid order id', (done) => {
            chai.request(server)
            .get('/history/nrt')
            .set('content-type','application/json')
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

        it('should get data with correct order id', (done) => {
            chai.request(server)
            .get(`/history/${orderHistoryId}`)
            .set('content-type','application/json')
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
    })

     /**END test get history item */
 
})