const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const BASE_URL = "/users";

let token;

const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "john1234",
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

let userId;

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
        const res = await request(app)
            .post(BASE_URL)
            .send(user);

        console.log(res.body);
        userId = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(user.firstName);
    }
);

test("PUT -> /users/:id, should return status code 200, res.body is defined, and res.body.firstName === 'Jane'",
    async () => {
        const res = await request(app)
            .put(`${BASE_URL}/${userId}`)
                                      .send({firstName: "Jane"})
                                      .set("authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe("Jane");
    }
);


test("POST -> /users/login, should return status code 200, res.body is defined, res.body.user.email === user.email, and res.body.token is defined",
    async () => {
        const userLogin = {
            email: "john@gmail.com",
            password: "john1234"
        }

        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send(userLogin);

        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.user.email).toBe(userLogin.email);
        expect(res.body.token).toBeDefined();
    }
);

test("POST -> /users/login, should return status code 401",
    async () => {
        const userLogin = {
            email: "j@gmail.com",
            password: "invalid password"
        }
        
        const res = await request(app).post(`${BASE_URL}/login`)
                                      .send(userLogin);

        expect(res.statusCode).toBe(401);
    }
);

test("DELETE -> /users/:id, should return status code 204",
    async () => {
        const res = await request(app).delete(`${BASE_URL}/${userId}`)
                                      .set("authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(204);
    }
);