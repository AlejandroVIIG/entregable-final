require('../models');
const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');

const BASE_URL = "/purchase";
const USER_LOGIN_URL = "/users/login";
let token;
let userId;
let product;

beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando1234"
    }

    const res = await request(app)
                        .post(USER_LOGIN_URL)
                        .send(user);

    token = res.body.token;
    userId = res.body.user.id;

    // product
    product = await Product.create({
        title: "lorem title",
        description: "lorem description",
        price: 49.99
    });

    await request(app).post('/cart')
                      .send({
                        productId: product.id,
                        quantity: 3
                      })
                      .set("Authorization", `Bearer ${token}`);
});

test("POST -> /purchase, should return status code 201, res.body is defined, and res.body.quantity === product.quantity",
    async () => {
        const res = await request(app)
                        .post(BASE_URL)
                        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body[0].quantity).toBe(3);
    }
);

test("GET -> /purchase, should return status code 200, res.body is defined, and res.body.length === 1",
    async () => {
        const res = await request(app)
                        .get(BASE_URL)
                        .set("Authorization", `Bearer ${token}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);

        expect(res.body[0].productId).toBeDefined();
        expect(res.body[0].productId).toBe(product.id);

        expect(res.body[0].userId).toBeDefined();
        expect(res.body[0].userId).toBe(userId);

        await product.destroy();
    }
);