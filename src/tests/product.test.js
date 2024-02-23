const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const User = require("../models/User");

const BASE_URL = "/products";
const USERS_BASE_URL = "/users"

let product;
let token;
let productId;
let category;

beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando1234",
    }

    const res = await request(app)
        .post(`${USERS_BASE_URL}/login`)
        .send({email: user.email, password: user.password});

    token = res.body.token;

    category = await Category.create({name: "Smart TV"});

    product = {
        title: "Lg oled 55",
        description: "lroem10",
        price: 20.30,
        categoryId: category.id
    }
    
});

test("POST -> /products, should return status code 201, res.body is defined, and res.body.title === product.title",
    async () => {
        const res = await request(app)
            .post(BASE_URL)
            .send(product)
            .set("Authorization", `Bearer ${token}`);

        productId = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.title).toBe(product.title);
    }
);

test("GET -> /products should return status code 200, res.body is defined, and res.body.length === 1",
    async () => {
        const res = await request(app)
            .get(BASE_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);

test("GET -> /products/:id, should return status code 200, res.body is defined, and res.body.title === 'lg oled 55'",
    async () => {
        const res = await request(app)
            .get(`${BASE_URL}/${productId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.title).toBe(product.title);
    }
);

test("PUT -> /products/:id, should return status code 200, res.body is defined and res.body.title === 'Sony QLED 55'",
    async () => {
        const res = await request(app)
            .put(`${BASE_URL}/${productId}`)
            .send({title: "Sony QLED 55"})
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.title).toBe("Sony QLED 55");
    }
);

test("DELETE -> /products/:id, should return status code 204",
    async () => {
        const res = await request(app)
            .delete(`${BASE_URL}/${productId}`)
            .set("Authorization", `Bearer ${token}`);

        await category.destroy();
    }
);