import { faker } from "@faker-js/faker";

export function createMockUser() {
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
