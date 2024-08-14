const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');


const assert = chai.assert
const should = chai.should
const expect = chai.expect


describe('API for "reqres.in/api"', () => {
    const BASE_URL = "https://reqres.in/api/"

    it('Test - View All Users', async () => {
        const response = await request("https://reqres.in/api/").get('users')
        console.log(response.statusCode);
        console.log(response.body);

        //assert status code and body
        should(response.statusCode === 200)
        assert.equal(response.body.data[1].email, "janet.weaver@reqres.in")
        expect(response.body.data[1].first_name).to.equal("Janet")

        // assert json schema
        const schemaPath = "resources/jsonSchema/get-user-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - Create New User', async () => {
        const body = {
            "name": "nadia",
            "job": "QA"
        }
        const response = await request(BASE_URL)
        .post('users')
        .send(body)
        console.log(response.statusCode);
        console.log(response.body);

        //assert status code and body
        assert.equal(response.statusCode, 201)
        assert.equal(response.body.job, "QA")

        // assert json schema
        const schemaPath = "resources/jsonSchema/post-user-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    })

    it('Test - Update User', async () => {
        const body = {
            "name": "nadia",
            "job": "QA"
        }
        const response = await request(BASE_URL)
        .put('users/7')
        .send(body)
        console.log(response.statusCode);
        console.log(response.body);

        //asertion json schema
        const schemaPath = "resources/jsonSchema/put-user-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    })

    it('Test - Delete User', async () => {
        const response = await request(BASE_URL).delete('users/6')
        console.log(response.statusCode);
        console.log(response.body);

        //assert status code
        should(response.statusCode === 204)

    })
});