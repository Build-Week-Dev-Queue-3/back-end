const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');
const user={id: 1, name: "Test", email: "email@email.com", password: "password", cohort: "web29", student: true}
afterAll(async () => {
    await db('comments').truncate()
    await db('tickets').truncate()
    await db('statuses').truncate()
    await db('users').truncate()
})

describe('tickets router tests', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    })
    describe('tests the ability to get a full list of tickts', () => {
        it('throws and error if youre not logged in', () => {
            return supertest(server)
                .get('/tickets')
                .then(resp => {
                    expect(resp.status).toBe(401)
                })
        })
        it('throws an error message if youre not logged in', () => {
            return supertest(server)
                .get('/tickets')
                .then(resp => {
                    expect(resp.body.message).toStrictEqual('Please provide the correct authorization')
                })
        })
        it('you get a 200 if logged in trying to get tickets', () => {
            return supertest(server)
                .post('/auth/register')
                .send(user)
                .then(resp => {
                    return supertest(server)
                    .post('/auth/login')
                    .send(user)
                    .then(resp => {
                        let token = resp.body.token
                        return supertest(server)
                        .get('/tickets')
                        .set('authorization', token)
                        .then(resp => {
                            expect(resp.status).toBe(200)
                        })
                    })
                })
                
        })
        it('you can get a list of tickets', () => {
            return supertest(server)
            .post('/auth/register')
            .send(user)
            .then(resp => {
                return supertest(server)
                .post('/auth/login')
                .send(user)
                .then(resp => {
                    let token = resp.body.token
                    return supertest(server)
                    .get('/tickets')
                    .set('authorization', token)
                    .then(resp => {
                        expect(resp.body.data).toHaveLength(0)
                    })
                })
            })
        })
        
    } )

})