//
//
//
// process.env.NODE_ENV = 'test';
// process.env.APP_USERNAME = 'username';
// process.env.APP_PASSWORD = 'password';

const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
const server = require('../server')
const pool = require('../src/config/db')

chai.should()
chai.use(chaiHttp)

const user = {
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'user@server.com',
    password: 'secret'
}

describe('Auth API', function() {

    //
    // Deze functie wordt eenmaal aangeroepen voordat de tests worden gestart.
    //
    before((done) => {
        // Verwijder alle voorgaande users uit de tabel
        const query = 'DELETE FROM `users`'
        pool.query(query, (err, rows, fields) => {
            if (err) {
                assert.fail(err)
            } else {
                // Registreer een user in de testdatabase
                const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?)'
                const values = [user.firstname, user.lastname, user.email, user.password]
                pool.query(query, values, (err, rows, fields) => {
                    if (err) {
                        assert.fail(err)
                    } else {
                        done();
                    }
                })
            }
        })
    });

    // beforeEach functie wordt aangeroepen voor iedere test.
    beforeEach(function () {
        console.log('beforeEach')
        // set things we need for testing
        //
        // Je zou hier kunnen kiezen om de database voor iedere test leeg te maken 
        // en opnieuw te vullen met enkele waarden, zodat je weet wat er in zit.
        //
    });
    
    // afterEach functie wordt aangeroepen voor iedere test.
    afterEach(function () {
        console.log('afterEach')
        // reset things we changed for testing
    });

    it('creates a user on valid registration', (done) => {

        // write your code here
        // Kijk goed in de andere tests waar de done moet staan!
        done()
    })

    it('returns an error on invalid registration', (done) => {

        // write your code here
        // Kijk goed in de andere tests waar de done moet staan!
        done()
    })

    it('returns an error on invalid login', (done) => {

        // write your code here
        // Kijk goed in de andere tests waar de done moet staan!
        done()
    })

    it('returns a token on valid login', function(done) {
        var user = {
            email: 'user@server.com',
            password: 'secret',
        }
        chai.request(server)
            .post('/api/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.result.should.have.property('token').that.is.a('string');

                // export a valid token voor gebruik in andere testcases.
                module.exports = {
                    token: res.body.result.token
                }
                done();
            });
    });

});