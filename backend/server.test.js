import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import request from "supertest";
import { beforeAll, describe, expect, test } from "vitest";
import { app } from "./server";

dotenv.config();

function createMockUser() {
	return {
		email: faker.internet.email(),
		phone: faker.phone.number(),
		name: faker.person.firstName(),
		middleName: faker.person.middleName(),
		fLastName: faker.person.lastName(),
		sLastName: faker.person.lastName(),
		birthday: faker.date.birthdate(),
		status: "EN_PROCESO",
		assignedAnalyst: faker.person.firstName(),
	};
}

const HEADERS = {
	Accept: "application/json",
	Authorization: `Bearer ${process.env.API_KEY}`,
};

beforeAll(() => {});

describe("GET users", () => {
	test("should retrieve the users from the db", async (done) => {
		const response = await request(app).get("/v1/users").set(HEADERS);
		expect(response.statusCode).toBe(200);
		expect(response.body.count).toBe(3);
		expect(response.body.data).toHaveLength(3);
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
		const mockUser = createMockUser();
		const response = await request(app)
			.post("/v1/users")
			.set(HEADERS)
			.send({ data: mockUser });
		expect(response.statusCode).toBe(201);
		expect(response.body.data.id).toBeTruthy();
		const responseUsers = await request(app).get("/v1/users").set(HEADERS);
		expect(responseUsers.body.data).toHaveLength(3);
		const responseUser = await request(app)
			.get(`/v1/users/${response.body.id}`)
			.set(HEADERS);
		expect(response.body.id).toBe(responseUser.body.id);
		expect(response.body.data.cardInfo.number).not.toBeUndefined();
		expect(response.body.data.cardInfo.type).not.toBeUndefined();
		expect(response.body.data.cardInfo.cvv).not.toBeUndefined();
		expect(response.body.data.cardInfo.pin).not.toBeUndefined();
		expect(response.body.data.cardInfo.expiration).not.toBeUndefined();
	});
});
