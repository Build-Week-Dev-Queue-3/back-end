const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');

const user = {name: "Test", email: "email@email.com", password: "password", cohort: "web29", student: true}
const inValidUser = {name: "Test", password: "password", cohort: "web29"}
const noUser = {email: "notregistered@email.com", password: "password"}
afterAll(async () => {
    await db('users').truncate()
})
describe('auth router tests', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    })
    describe('tests the register functionality', () => {
        describe('you can register a user', () => {
            it("it receives a 201 upon register", () => {
                return supertest(server)
                .post('/auth/register')
                .send(user)
                .expect(201)
            })
            it('receives error if you dont send full object', () => {
                return supertest(server)
                .post('/auth/register')
                .send(inValidUser)
                .expect(400)
            })
            it('receives an error if your user is not unique', () => {
                return supertest(server)
                .post('/auth/register')
                .send(user)
                .expect(500)
            })
        })
    })
    describe('it tests the login functionality', () => {
        describe('you can login', () => {
            it('receives a 200 Ok when login', () => {
                return supertest(server)
                    .post('/auth/login')
                    .send(user)
                    .expect(200)
            })
            it('gives an error with missing username', () => {
                return supertest(server)
                    .post('/auth/login')
                    .send(inValidUser)
                    .expect(400)
            })
            it('gives a 401 if your username doesnt exist', () => {
                return supertest(server)
                    .post('/auth/login')
                    .send(noUser)
                    .expect(401)
            })
        })
    })
})