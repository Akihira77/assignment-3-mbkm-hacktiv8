import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import startServer from "../src/utils/server.js";
import { sequelize } from "../src/data/db.js";
import supertest from "supertest";
import { CreatePhotoDto } from "../src/dto/photo.dto.js";
import { LoginResponseDTO } from "../src/dto/user.dto.js";

const app = startServer();
const userData = {
	username: "usertest",
	email: "user@mail.com",
	password: "user123",
};

const userLoginData = {
	email: "user@mail.com",
	password: "user123",
};

let photoData: CreatePhotoDto = {
	title: "Fotoku",
	caption: "My Cool Photo",
	imageUrl: "http:/icakicak",
	userId: "",
};

describe("Photo", () => {
	let user: LoginResponseDTO = {
		email: "",
		token: "",
		userId: "",
		username: "",
	};
	let photoId: string = "";
	beforeAll(async () => {
		await sequelize.sync({ force: true });
		await supertest(app).post("/api/v1/user/register").send(userData);

		const userResponse = await supertest(app)
			.post("/api/v1/user/login")
			.send(userLoginData);

		user = userResponse.body.user;

		photoData.userId = String(userResponse.body.user.userId);
		const photoResponse = await supertest(app)
			.post("/api/v1/photo")
			.send(photoData)
			.set("Authorization", `Bearer ${user.token}`);

		photoId = photoResponse.body.photo.id;
	});

	afterAll(async () => {
		await sequelize.sync({ force: true });
	});
	describe("POST api/v1/photo", () => {
		it("NOT PROVIDED TOKEN CASE - should return 401 unauthorized", async () => {
			const { body, statusCode } = await supertest(app)
				.post("/api/v1/photo")
				.send({
					title: "",
					caption: "",
					imageUrl: "",
					userId: "",
				});

			expect(statusCode).toBe(401);
			expect(body).toHaveProperty("msg");
		});

		it("PROVIDE INCORRECT TOKEN CASE - should return 500 and got jsonwebtokenerror message", async () => {
			const { body, statusCode } = await supertest(app)
				.post("/api/v1/photo")
				.send({
					title: "",
					caption: "",
					imageUrl: "",
					userId: "",
				})
				.set("Authorization", "Bearer token");

			expect(statusCode).toBe(500);
			expect(body).toHaveProperty("name", "JsonWebTokenError");
		});

		it("PROVIDE NOT BEARER TOKEN CASE - should return 401 unauthorized", async () => {
			const { body, statusCode } = await supertest(app)
				.post("/api/v1/photo")
				.send({
					title: "",
					caption: "",
					imageUrl: "",
					userId: "",
				})
				.set("Authorization", "token");

			expect(statusCode).toBe(401);
			expect(body).toHaveProperty("msg");
		});

		describe("EMPTY BODY", () => {
			it("PROVIDE TOKEN CASE WITH (all) EMPTY BODY", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/v1/photo")
					.send({
						title: "",
						caption: "",
						imageUrl: "",
						userId: "",
					})
					.set("Authorization", `Bearer ${user.token}`);

				expect(statusCode).toBe(400);
				expect(body).toHaveProperty(
					"msg",
					"Photo must be tied by User, however User your provided does not exist"
				);
			});

			it("PROVIDE TOKEN CASE WITH (title) EMPTY", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/v1/photo")
					.send({
						title: "",
						caption: "awdawd",
						imageUrl: "awdawd",
						userId: user.userId,
					})
					.set("Authorization", `Bearer ${user.token}`);

				expect(statusCode).toBe(400);
				expect(body).toHaveProperty("name", "Validation Error");
				expect(body).toHaveProperty("errors");
			});

			it("PROVIDE TOKEN CASE WITH (caption) EMPTY", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/v1/photo")
					.send({
						title: "awda",
						caption: "",
						imageUrl: "awdad",
						userId: user.userId,
					})
					.set("Authorization", `Bearer ${user.token}`);

				expect(statusCode).toBe(400);
				expect(body).toHaveProperty("name", "Validation Error");
				expect(body).toHaveProperty("errors");
			});

			it("PROVIDE TOKEN CASE WITH (imageurl) EMPTY", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/v1/photo")
					.send({
						title: "awdwadaw",
						caption: "",
						imageUrl: "",
						userId: user.userId,
					})
					.set("Authorization", `Bearer ${user.token}`);

				expect(statusCode).toBe(400);
				expect(body).toHaveProperty("name", "Validation Error");
				expect(body).toHaveProperty("errors");
			});

			it("PROVIDE TOKEN CASE WITH (imageurl) NULL", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/v1/photo")
					.send({
						title: "awdwadaw",
						caption: "",
						userId: user.userId,
					})
					.set("Authorization", `Bearer ${user.token}`);

				expect(statusCode).toBe(400);
				expect(body).toHaveProperty("name", "Validation Error");
				expect(body).toHaveProperty("errors");
			});

			it("PROVIDE TOKEN CASE WITH (userId) empty", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/v1/photo")
					.send({
						title: "awdwadaw",
						caption: "",
						imageUrl: "",
						userId: "",
					})
					.set("Authorization", `Bearer ${user.token}`);

				expect(statusCode).toBe(400);
				expect(body).toHaveProperty(
					"msg",
					"Photo must be tied by User, however User your provided does not exist"
				);
			});
		});

		it("PROVIDE TOKEN CASE WITH WRONG userId - return 400", async () => {
			const { body, statusCode } = await supertest(app)
				.post("/api/v1/photo")
				.send({
					title: "awdwadaw",
					caption: "awda",
					imageUrl: "awda",
					userId: "adwad",
				})
				.set("Authorization", `Bearer ${user.token}`);

			expect(statusCode).toBe(400);
			expect(body).toHaveProperty(
				"msg",
				"Photo must be tied by User, however User your provided does not exist"
			);
		});

		it("SUCCESS CASE - should return 201", async () => {
			const { body, statusCode } = await supertest(app)
				.post("/api/v1/photo")
				.send(photoData)
				.set("Authorization", `Bearer ${user.token}`);

			expect(statusCode).toBe(201);
			expect(body).toHaveProperty("msg");
		});
	});

	describe("GET api/v1/photo", () => {
		it("NOT PROVIDE TOKEN CASE - should return 401 unauthorized", async () => {
			const { body, statusCode } = await supertest(app).get(
				"/api/v1/photo"
			);

			expect(statusCode).toBe(401);
			expect(body).toHaveProperty("msg");
		});

		it("PROVIDE INCORRECT TOKEN CASE - should return 500 and got jsonwebtokenerror message", async () => {
			const { body, statusCode } = await supertest(app)
				.get("/api/v1/photo")
				.set("Authorization", `Bearer wrong token`);

			expect(statusCode).toBe(500);
			expect(body).toHaveProperty("name", "JsonWebTokenError");
		});

		it("PROVIDE NOT BEARER TOKEN CASE - should return 400 and get all photos", async () => {
			const { body, statusCode } = await supertest(app)
				.get("/api/v1/photo")
				.set("Authorization", `wrong token`);

			expect(statusCode).toBe(401);
			expect(body).toHaveProperty("msg");
		});

		it("PROVIDE CORRECT TOKEN CASE - should return 200 and get all photos", async () => {
			const { body, statusCode } = await supertest(app)
				.get("/api/v1/photo")
				.set("Authorization", `Bearer ${user.token}`);

			expect(statusCode).toBe(200);
			expect(body).toHaveProperty("photos");
		});
	});

	describe("GET api/v1/photo/:id", () => {
		it("NOT PROVIDE TOKEN CASE - should return 401 unauthorized", async () => {
			const { body, statusCode } = await supertest(app).get(
				`/api/v1/photo/${123}`
			);

			expect(statusCode).toBe(401);
			expect(body).toHaveProperty("msg");
		});

		it("PROVIDE INCORRECT TOKEN CASE - should return 400 and get all photos", async () => {
			const { body, statusCode } = await supertest(app)
				.get(`/api/v1/photo/${123}`)
				.set("Authorization", `Bearer abs`);

			expect(statusCode).toBe(500);
			expect(body).toHaveProperty("name", "JsonWebTokenError");
		});

		it("PROVIDE NOT BEARER TOKEN CASE - should return 400 and get all photos", async () => {
			const { body, statusCode } = await supertest(app)
				.get(`/api/v1/photo/${123}`)
				.set("Authorization", `abs`);

			expect(statusCode).toBe(401);
			expect(body).toHaveProperty("msg");
		});

		it("PROVIDE CORRECT TOKEN CASE AND NOT FOUND ID - should return 404 and photo", async () => {
			const { body, statusCode } = await supertest(app)
				.get(`/api/v1/photo/${12314}`)
				.set("Authorization", `Bearer ${user.token}`);

			expect(statusCode).toBe(404);
			expect(body).toHaveProperty("msg", "Photo does not found");
			// expect(body).toEqual({ msg: "Photo does not found" });
		});

		it("PROVIDE CORRECT TOKEN CASE AND FOUND ID - should return 200 and photo", async () => {
			const { body, statusCode } = await supertest(app)
				.get(`/api/v1/photo/${photoId}`)
				.set("Authorization", `Bearer ${user.token}`);

			expect(statusCode).toBe(200);
			expect(body).toHaveProperty("photo");
		});
	});
});
