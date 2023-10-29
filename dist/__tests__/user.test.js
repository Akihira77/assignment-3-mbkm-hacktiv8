import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import startServer from "../src/utils/server.js";
import { sequelize } from "../src/data/db.js";
const app = startServer();
const userData = {
    username: "andika",
    email: "user@mail.com",
    password: "user123",
};
describe("User", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize.sync({ force: true });
    });
    describe("POST api/v1/user/register", () => {
        it("SUCCESS CASE - should return a 201 and message", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/api/v1/user/register")
                .send(userData);
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("msg");
        });
        it("DUPLICATE CASE - should return 400 and message", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/api/v1/user/register")
                .send(userData);
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty("msg");
        });
        it("ALL EMPTY CASE - should return 400 and message", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/api/v1/user/register")
                .send({ username: "", email: "", password: "" });
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty("msg");
        });
    });
    describe("POST api/v1/user/login", () => {
        it("WRONG EMAIL/PASSWORD CASE - should return 400 with messages email or password is not correct", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/api/v1/user/login")
                .send({
                email: "notuser@mail.com",
                password: userData.password,
            });
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty("msg");
        });
        it("EMPTY EMAIL/PASSWORD CASE - should return 400 with messages email or password is not correct", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/api/v1/user/login")
                .send({
                email: "",
                password: "",
            });
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty("msg");
        });
        it("SUCCESS CASE - should return 200 with user info and token", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/api/v1/user/login")
                .send({
                email: userData.email,
                password: userData.password,
            });
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("user.token");
        });
    });
});
//# sourceMappingURL=user.test.js.map