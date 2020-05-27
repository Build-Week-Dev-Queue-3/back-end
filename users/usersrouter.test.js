const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');
const user={id: 1, name: "Test", email: "email@email.com", password: "password", cohort: "web29", student: true}
const user2={id: 2, name: "Test", email: "memail@email.com", password: "password", cohort: "web29", student: true}
const updateuser2 = {id: 1, name: "Updated Test", email: "memail@email.com", password: "password", cohort: "web29", student: true}
afterAll(async () => {
    await db('users').truncate()
})
describe('userrouter tests', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    })

    describe('able to retrieve all users', () => {
        describe('allows you to access all users if logged in', () => {
            it('registers user', () => {
                return supertest(server)
                .post('/auth/register')
                .send(user)
            })
            it('logs in and then sends token', () => {
                return supertest(server)
                .post('/auth/login')
                .send(user)
                .then(res => {
                    const token = res.body.token
                    return supertest(server)
                    .get('/users')
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.data).toHaveLength(1)
                    })
                })
            })
        })
    })
    describe('ability to update your profile', () => {
        describe('only lets you update your profile', () => {
            it('registers you and logs you in', () => {
                return supertest(server)
                .post('/auth/register')
                .send(user2)
                .then(resp => {
                    expect(resp.status).toBe(200)
                    return supertest(server)
                    .post('/auth/login')
                    .send(user2)
                    .then(response => {
                        const token = response.body.token
                    })
                })
            })
            it('lets you update your profile', () => {
                return supertest(server)
                .put(`/users/${updateuser2.id}`)
                .send(updateuser2)
                .expect(200)
            })
        })
    })
})