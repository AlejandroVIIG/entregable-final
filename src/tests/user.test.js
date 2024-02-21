const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const BASE_URL = "/users";

let token;

const user = {
    firstName: "Victor",
    lastName: "Villa",
    email: "victor@gmail.com",
    password: "victor1234",
    phone: "+5211223344"
}

beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando1234"
    }

    const res = await request(app).post(`${BASE_URL}/login`)
                                  .send(user);

    token = res.body.token;
});

test("GET -> /users, should return status code 200, res.body is defined, and res.body.length === 1",
    async () => {
        const res = await request(app).get(BASE_URL)
                                      .set('authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);

test("POST -> /users, should return status code 201, res.body is defined, and res.body.firstName === user.firstName",
    async () => {
        const res = await request(app).post(BASE_URL)
                                      .send(user);

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(user.firstName);
    }
);