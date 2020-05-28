const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');
// afterAll(async () => {
//     await db.migrate.rollback()
//     .then(() => db.migrate.latest())
//     .then(() => db.seed.run())
// })
const user = {id: 10, name: "Test", email: "emailm@email.com", password: "password", cohort: "web29", student: true}
const noEmail = {name: "Test", password: "password", cohort: "web29"}
const noPassword = {name: "Test", email: "password", cohort: "web29"}
const noCohort = {name: "Test", email: "noCohort@cohort.com",password: "password"}
const noUser = {email: "notregistered@email.com", password: "password"}
const noStudentHelper = {name: "Test", email: "notstudent@nothelper.com", password: "password", cohort: "web29", student: false, helper: false }

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
            it('receives error if you dont send email', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noEmail)
                .expect(400)
            })
            it('receives error message if you dont send email', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noEmail)
                .then(res => {
                    expect(res.body.message).toStrictEqual("Please provide a email for the user")
                })
            })
            it('receives error if you dont send password', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noPassword)
                .expect(400)
            })
            it('receives error message if you dont send password', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noPassword)
                .then(res => {
                    expect(res.body.message).toStrictEqual("Please provide a valid password for the user")
                })
            })
            it('receives error if you dont send cohort', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noCohort)
                .expect(400)
            })
            it('receives error message if you dont send cohort', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noCohort)
                .then(res => {
                    expect(res.body.message).toStrictEqual("Please provide a cohort for the user")
                })
            })
            it('receives error if you dont send student or helper', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noStudentHelper)
                .expect(400)
            })
            it('receives error message if you dont send student or helper', () => {
                return supertest(server)
                .post('/auth/register')
                .send(noStudentHelper)
                .then(res => {
                    expect(res.body.message).toStrictEqual("Please check if you are a student and/or a helper")
                })
            })
            it('receives an error if your user is not unique', () => {
                return supertest(server)
                .post('/auth/register')
                .send(user)
                .expect(400)
            })
            it('receives a message telling you to login instead', () => {
                return supertest(server)
                .post('/auth/register')
                .send(user)
                .then(res => {
                    expect(res.body.message).toStrictEqual("There is already an account with that email, if yours yours, login instead")
                })
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
            it('receives a logged in message', () => {
                return supertest(server)
                    .post('/auth/login')
                    .send(user)
                    .then(res => {
                        expect(res.body.message).toStrictEqual("Logged in successfully")
                    })
            })
            it('receives a user back after login', () => {
                return supertest(server)
                    .post('/auth/login')
                    .send(user)
                    .then(res => {
                        expect(res.body.user).toBeDefined()
                    })
            })
            it('gives an error with missing username', () => {
                return supertest(server)
                    .post('/auth/login')
                    .send(noEmail)
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