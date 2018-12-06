const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const pool = require('../src/config/db')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/games'

const gamedata = {
    title: 'gametitle',
    producer: 'gameproducer',
    year: 2000,
    type: 'ADVENTURE'
}

describe('Games API GET', () => {

    //
    // Deze functie wordt eenmaal aangeroepen voordat de tests worden gestart.
    //
    before((done) => {
        // Verwijder alle voorgaande data uit de tabel
        const query = 'DELETE FROM `games`'
        pool.query(query, (err, rows, fields) => {
            if (err) {
                assert.fail(err)
            } else {
                // Registreer data in de testdatabase
                const query = 'INSERT INTO `games` (`title`, `producer`, `year`, `type`) VALUES (?, ?, ?, ?)'
                const values = [gamedata.title, gamedata.producer, gamedata.year, gamedata.type]
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

    it('should return an array of Games', (done) => {
        const token = require('./authentication.test').token
        chai.request(server)
            .get(endpointToTest)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result.should.be.an('array')
                res.body.result.should.have.length(1)
                done()
            })
    })
})

// 
// Verwijder .skip in ieder van de volgende tests en implementeer ze op de juiste manier.
//

describe('Games API POST', () => {

    it.skip('should return a valid game when posting a valid object', (done) => {
 
        chai.request(server)
            .post(endpointToTest)
            .send({
                'name': '  somename  ',
                'producer': '  someproducer   ',
                'year': 2020,
                'type': ' sometype '
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const Games = res.body
                Games.should.have.property('name').that.is.an('object')

                const name = Games.name
                name.should.have.property('firstname').equals('FirstName')
                name.should.have.property('lastname').equals('LastName')
                Games.should.have.property('email').equals('user@host.com')
                Games.should.not.have.property('password')
                done()
        })
    })

    it.skip('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', 'in.valid.token')
            .send({
                'firstname': '  FirstName  ',
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it.skip('should throw an error when no firstname is provided', (done) => {
        const token = require('./authentication.test').token
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
    })

})

describe('Games API PUT', () => {
    it.skip('should return the updated Games when providing valid input', (done) => {
        const token = require('./authentication.test').token
        // console.log('token = ' + token)
        chai.request(server)
            .put(endpointToTest + '/0')
            .set('x-access-token', token)
            .send({
                'firstname': '  NewFirstName  ',
                'lastname': '  NewLastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                // Check: 
                // Verify that the Games that we get is the updated Games.
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('name').which.is.an('object')
                const name = response.name
                name.should.have.property('firstname').equals('NewFirstName')
                name.should.have.property('lastname').equals('NewLastName')

                // Double check:
                // Send a GET-request to verify that the Games has been updated.
                chai.request(server)
                    .get('/api/Gamess')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.an('array')
                        const result = res.body
                        result[0].name.should.have.property('firstname').equals('NewFirstName')
                        result[0].name.should.have.property('lastname').equals('NewLastName')

                        done()
                    })
            })
    })
})

describe('Games API DELETE', () => {
    it.skip('should return http 200 when deleting a Games with existing id', (done) => {
        // Write your test here
        done()
    })

})