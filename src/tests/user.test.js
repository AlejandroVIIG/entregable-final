const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const BASE_URL = "/users";

const user = {
    firstName: "Victor",
    lastName: "Villa",
    email: "victor@gmail.com",
    password: "victor1234",
    phone: "+5211223344"
}

test("POST -> /users, should return status code 201, res.body is defined, and res.body.firstName === user.firstName",
    async () => {
        const res = await request(app).post(BASE_URL)
                                      .send(user);

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(user.firstName);
    }
);