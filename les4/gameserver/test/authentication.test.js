//
//
//
// process.env.NODE_ENV = 'test';
// process.env.APP_USERNAME = 'username';
// process.env.APP_PASSWORD = 'password';

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


describe('Auth API', function() {

    before((done) => {
        console.log('before')

        var user = {
            username: "username",
            password: "password"
        }

        // registreer een user in de testdatabase
        // ToDo!
        done();
    });

    //
    beforeEach(function () {
        console.log('beforeEach')
        // set things we changed for testing
    });
    
    //
    afterEach(function () {
        console.log('afterEach')
        // reset things we changed for testing
    });

    it('returns a token on POST /api/login', function(done) {
        var user = {
            email: "test2@server.com",
            password: "secret"
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.result.should.have.property('token').that.is.a('string');

                // console.log('token = ' + res.body.result.token)
                module.exports = {
                    token: res.body.result.token
                }
                done();
            });
    });

});