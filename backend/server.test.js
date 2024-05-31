import dotenv from "dotenv";
import request from "supertest";
import { beforeAll, describe, expect, test } from "vitest";
import { app } from "./server";

dotenv.config();

const HEADERS = {
	Accept: "application/json",
	Authorization: `Bearer ${process.env.API_KEY}`,
};

beforeAll(() => {});

describe("GET users", () => {
	test("should retrieve the users from the db", async (done) => {
		const response = await request(app).get("/v1/users").set(HEADERS);
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toHaveLength(3);
		expect(response.body.total).toBe(3);
	});
});

describe("DELETE user", () => {
	test("should delete an user from the db", async (done) => {
		const response = await request(app).delete("/v1/users/1").set(HEADERS);
		expect(response.statusCode).toBe(200);
		const responseUsers = await request(app).get("/v1/users").set(HEADERS);
		expect(responseUsers.body.data).toHaveLength(2);
	});
});

describe("CREATE user", () => {
	test("should create an user in the db", async (done) => {
		const response = await request(app).post("/v1/users").set(HEADERS).send({
			email: "monica@atratopago.com",
			phone: "+52332140563",
			name: "Monica",
			middleName: "Maria",
			fLastName: "Flores",
			sLastName: "Herrera",
			birthday: "1998-02-12",
			status: "EN_PROCESO",
			assignedAnalyst: "David",
		});
		expect(response.statusCode).toBe(201);
		const responseUsers = await request(app).get("/v1/users").set(HEADERS);
		expect(responseUsers.body.data).toHaveLength(3);
		const responseUser = await request(app)
			.get(`/v1/users/${response.body.id}`)
			.set(HEADERS);
		expect(response.body.id).toBe(responseUser.body.id);
	});
});
