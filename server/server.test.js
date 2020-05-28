const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../server/server.js');

describe('server tests', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    })
    describe('can access the API', () => {
        it('receives a 200 OK', () => {
            return supertest(server)
            .get('/')
            .then(response => {
                expect(response.status).toBe(200)
            })
        })
        it('receives a api online message', () => {
            return supertest(server)
            .get('/')
            .then(response => {
                expect(response.body).toStrictEqual({api: "API is onlilne"})
            })
        })
    })
})