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

        it('should reject item post request when token is incorrect', (done) => {
            chai.request(server)
            .post('/item')
            .set('content-type', 'multipart/form-data')
            .set('authorization', 'Bearer ' + token + "qweq")
            .attach('imagePath', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'the Burger')
            .field('description', 'delicious dish')
            .field('price', 4.99)
            .field('category', 'burgers')
            .field('restaurantId', restaurantId)
            .end((err, res) => {
                res.should.have.status(401);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject item post request when data name is incorrect', (done) => {
            chai.request(server)
            .post('/item')
            .set('content-type', 'multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('itemname', 'the Burger')
            .field('description', 'delicious dish')
            .field('price', 4.99)
            .field('category', 'burgers')
            .field('restaurantId', restaurantId)
            .end((err, res) => {
                res.should.have.status(400);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })
    /**END test create item */

    /** Test get items */

    describe('GET item request into item', () => {
        it('should get item data when restaurantId is correct', (done) => {
            chai.request(server)
            .get(`/item/${restaurantId}`)
            .end((err, res) => {
                res.should.have.status(200);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject item request without id', (done) => {
            chai.request(server)
            .get('/item')
            .end((err, res) => {
                res.should.have.status(404);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject item request with invalid id', (done) => {
            chai.request(server)
            .get('/item/oue')
            .end((err, res) => {
                res.should.have.status(400);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })
    /**END test get items */

    /** Test PUT items */

    describe('PUT item request into item table', () => {
        it('should modify item data when data is correct', (done) => {
            chai.request(server)
            .put(`/item/${itemId}`)
            .set('content-type', 'multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .attach('imagePath', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'the Burger')
            .field('description', 'delicious dish')
            .field('price', '4.99')
            .field('category', 'burgers')
            .field('restaurantId', restaurantId)
            .end((err, res) => {
                res.should.have.status(200);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject modify when token is invalid', (done) => {
            chai.request(server)
            .put(`/item/${itemId}`)
            .set('content-type', 'multipart/form-data')
            .set('authorization', 'Bearer ' + token + "wer")
            .attach('imagePath', fs.readFileSync('./test/tictactoe.png'), 'tictactoe.png')
            .field('name', 'the Burger')
            .field('description', 'delicious dish')
            .field('price', 4.99)
            .field('category', 'burgers')
            .field('restaurantId', restaurantId)
            .end((err, res) => {
                res.should.have.status(401);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject put request when data type is invalid', (done) => {
            chai.request(server)
            .put(`/item/${itemId}`)
            .set('content-type', 'multipart/form-data')
            .set('authorization', 'Bearer ' + token)
            .field('','')
            .field('desription', 'delicious dish')
            .field('price', 'qwe')
            .field('cateory', 'burgers')
            .field('resturantId', restaurantId)
            .end((err, res) => {
                res.should.have.status(400);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })
    /**END test put items */


    /** Test DELETE item*/

    describe('DELETE item request into item', () => {
        it('should delete item data when itemId is correct', (done) => {
            chai.request(server)
            .delete(`/item/${itemId}`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject item delete request with incorrect token', (done) => {
            chai.request(server)
            .delete(`/item/${itemId}`)
            .set('authorization', 'Bearer ' + token + "qwrra")
            .end((err, res) => {
                res.should.have.status(401);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })

        it('should reject item delete request with wrong id', (done) => {
            chai.request(server)
            .delete('/item/tert')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(400);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
        })
    })

    /**END test delete item */
})