// must test ickets first

const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');
const user2={id: 2, name: "Test", email: "memail@email.com", password: "password", cohort: "web29", student: true}
afterAll(async () => {
    // await db('comments').truncate()
    // await db('tickets').truncate()
    // await db('statuses').truncate()
    // await db('users').truncate()
    await supertest(server)
    .post('/auth/register')
    .send(user2)
    .then(resp => {
        expect(resp.status).toBe(201)
        return supertest(server)
        .post('/auth/login')
        .send(user2)
        .then(response => {
            const token = response.body.token
        })
    })

})
describe('comments router tests', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    })
})