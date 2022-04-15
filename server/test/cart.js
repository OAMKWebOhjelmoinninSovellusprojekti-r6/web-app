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
    let cartId = null;

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

    /**Test create item */
    let itemId = null;

    describe('POST item request into item table', () => {
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
                    itemId = res.body.itemId;
                    done();
                }
            })
        })
    })

    /**END test create item */

    /** Test create shoppingcart item*/

    describe('POST shopping cart item request ', () => {
        it('should add shoppingcart item when data is correct', (done) => {
            chai.request(server)
            .post('/cart')
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                itemId: itemId,
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(200);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject shoppingcart item request when missing fields from the data', (done) => {
            chai.request(server)
            .post('/cart')
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with empty data structure', (done) => {
            chai.request(server)
            .post('/cart')
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject request with invalid token', (done) => {
            chai.request(server)
            .post('/cart')
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token + 'zxcqweasd')
            .send({
                itemId: itemId,
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(401);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    });
    /** END test shopping cart create*/


    /** Test get shoppingcart items */

    let cartItemId = null;

    describe('GET shopping cart item request ', () => {
        it('should get shoppingcart item when data is correct', (done) => {
            chai.request(server)
            .get(`/cart/${cartId}`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                itemId: itemId,
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(200);
                if (err) {
                    console.log(err);
                } else {
                    cartItemId = res.body.shoppingCartInfo[0].idItem;
                    done();
                }
            })
        })
    })
    /**END test get shoppingcart item */


    /**Test modify shoppingcart item */
    describe('PUT shopping cart item request ', () => {
        it('should modify shoppingcart item when data is correct', (done) => {
            chai.request(server)
            .put(`/cart/${cartItemId}`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                itemId: itemId,
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(200);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject shoppingcart modification when authentication is invalid', (done) => {
            chai.request(server)
            .put(`/cart/${cartItemId}`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token + 'awe')
            .send({
                itemId: itemId,
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(401);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject shoppingcart modification when cart item id is invalid', (done) => {
            chai.request(server)
            .put(`/cart/qwdqxq`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .send({
                itemId: itemId,
                quantity: 1,
                idrestaurant: restaurantId
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })
    /**END test modify shoppingcart item */


    /** Test delete cart item*/

    describe('DELETE shopping cart item request ', () => {
        it('should delete shoppingcart item when data is correct', (done) => {
            chai.request(server)
            .delete(`/cart/${cartItemId}`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject delete shoppingcart item id is invalid', (done) => {
            chai.request(server)
            .delete(`/cart/qweasdq`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject delete shoppingcart item request when authentication is invalid', (done) => {
            chai.request(server)
            .delete(`/cart/${cartItemId}`)
            .set('content-type', 'application/json')
            .set('authorization', 'Bearer ' + token + "erw")
            .end((err, res) => {
                res.should.have.status(401);
                if (err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })
    /**END test delete cart item */

})