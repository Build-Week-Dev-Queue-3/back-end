const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');
const user={id: 1, name: "Test", email: "email@email.com", password: "password", cohort: "web29", student: true}
const user2={id: 2, name: "Test", email: "memail@email.com", password: "password", cohort: "web29", student: true}
const updateuser2 = {id: 2, name: "Updated Test", email: "memail@email.com", password: "password", cohort: "web29", student: true}
let token;

afterAll(async () => {
    await db('comments').truncate()
    await db('tickets').truncate()
    await db('statuses').truncate()
    await db('users').truncate()
    await supertest(server)
        .post('/auth/register')
        .send(user2)
        .then(resp => {
            expect(resp.status).toBe(201)
        })
    await supertest(server)
        .post('/auth/login')
        .send(user2)
        .then(response => {
             let token = response.body.token
             return token
        })

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
                    const token2 = res.body.token
                    return supertest(server)
                    .get('/users')
                    .set('authorization', token2)
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
                })
            })
            it('sends users back', () => {
                return supertest(server)
                .post('/auth/login')
                .send(user)
                .then(res => {
                    const token2 = res.body.token
                    return supertest(server)
                    .get('/users')
                    .set('authorization', token2)
                    .then(res => {
                        const length= res.body.data.length
                        expect(res.body.data).toHaveLength(length)
                    })
                })
            })
            it('throws 401 if no token sent', () => {
                return supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.status).toBe(401)
                })
            })
            it('sends message back if no token sent', () => {
                return supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.body.message).toBeDefined()
                })
            })
            it('sends message back if no token sent', () => {
                return supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.body.message).toStrictEqual("Please provide the correct authorization")
                })
            })
        })
    })
    describe('ability to update your profile', () => {
        describe('only lets you update your profile', () => {
            it('lets you update your profile', async () => {
                await supertest(server)
                .post('/auth/login')
                .send(user2)
                .then(response => {
                     let token = response.body.token
                     return supertest(server)
                     .put(`/users/${updateuser2.id}`)
                     .set('authorization', token)
                     .send(updateuser2)
                     .expect(200)
                })
            })
            it('throws an error when its not your profile', async () => {
                await supertest(server)
                .post('/auth/login')
                .send(user)
                .then(response => {
                    let token = response.body.token
                    return supertest(server)
                    .put(`/users/${updateuser2.id}`)
                    .set('authorization', token)
                    .send(updateuser2)
                    .then(response =>{
                        expect(response.status).toBe(401)
                    })
                })
            })
            it('throw you can only update your own profile', async () => {
                await supertest(server)
                .post('/auth/login')
                .send(user)
                .then(response => {
                    let token = response.body.token
                    return supertest(server)
                    .put(`/users/${updateuser2.id}`)
                    .set('authorization', token)
                    .send(updateuser2)
                    .then(response =>{
                        expect(response.body.message).toStrictEqual("You can only update your own user profile")
                    })
                })
            })
        })
    })
})