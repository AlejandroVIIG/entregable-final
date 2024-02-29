require("../models");
const request = require("supertest");
const Product = require("../models/Product");
const app = require("../app");

const USER_LOGIN_URL = "/users/login"
const BASE_URL = "/cart";

let token;
let product;
let cart;
let userId;
let cartId;

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

    product = await Product.create({
        title: "playera",
        description: "lorem playera",
        price: 24.99
    });

    cart = {
        quantity: 1,
        productId: product.id
    }
});

test("POST -> /cart, should return status code 201, res.body is defined and res.body.quantity === bodyCart.quantity",
    async () => {
        const res = await request(app)
                        .post(BASE_URL)
                        .send(cart)
                        .set("Authorization", `Bearer ${token}`);

        cartId = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.quantity).toBe(1);
        expect(res.body.userId).toBe(userId)
        expect(res.body.quantity).toBe(cart.quantity);
    }
);

test("GET -> /cart, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        const res = await request(app)
                        .get(BASE_URL)
                        .set("Authorization", `Bearer ${token}`);
                
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);

        expect(res.body[0].userId).toBeDefined();
        expect(res.body[0].userId).toBe(userId);

        expect(res.body[0].productId).toBeDefined();
        expect(res.body[0].productId).toBe(product.id);

        
    }
);

test("GET -> 'cart/:id', should return status 200, res.body is defined and res.body.quantity === cart.quantity",
    async () => {
        const res = await request(app)
                        .get(`${BASE_URL}/${cartId}`)
                        .set('Authorization', `Bearer ${token}`);
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.quantity).toBe(cart.quantity);
    
        expect(res.body.userId).toBeDefined();
        expect(res.body.userId).toBe(userId);
    
        expect(res.body.productId).toBeDefined();
        expect(res.body.productId).toBe(product.id);
    }
);

test("PUT -> 'cart/:id' should return status code 200, res.body is defined, and res.body.quantity === 3",
    async () => {

        const res = await request(app)
                        .put(`${BASE_URL}/${cartId}`)
                        .send({ quantity: 3 })
                        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.quantity).toBe(3)
    }
);

test("DELETE -> 'URL_BASE/:id' should return status code 204",
    async () => {
        const res = await request(app)
                        .delete(`${BASE_URL}/${cartId}`)
                        .set('Authorization', `Bearer ${token}`);
    
        expect(res.status).toBe(204);
        await product.destroy();
    }
);