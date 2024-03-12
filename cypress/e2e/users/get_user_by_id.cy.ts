import { fakerEN } from "@faker-js/faker";
import { newUser } from "../../fixtures/new_user";

describe("GET /v1/users/:id", () => {
    it("should return a user with the provided id", () => {
        cy.api({
            url: "http://localhost:3000/v1/users",
            method: "POST",
            body: newUser
        }).then(createUserResponse => {
            cy.api({
                url: `http://localhost:3000/v1/users/${createUserResponse.body.id}`,
                method: "GET",
            }).then(response => {
                expect(response.status).to.be.equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.id).to.be.equal(createUserResponse.body.id);
                expect(response.body.name).to.be.equal(createUserResponse.body.name);
                expect(response.body.email).to.be.equal(createUserResponse.body.email);
            })
        })
    })

    it("should return 204 with empty body if the provided id is not in the database", () => {
        cy.api({
            url: `http://localhost:3000/v1/users/${fakerEN.string.uuid()}`,
            method: "GET",
        }).then(response => {
            expect(response.status).to.be.equal(204);
            expect(response.body).to.be.empty;
        })
    })
})