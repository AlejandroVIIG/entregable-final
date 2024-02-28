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

        console.log(res.body);
        cartId = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.quantity).toBe(1);
        expect(res.body.userId).toBe(userId)

        await product.destroy();
    }
);

/*
test("GET -> /cart, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        const res = await request(app)
                        .get(BASE_URL)
                        .set("Authorization", `Bearer ${token}`);
                
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);
*/