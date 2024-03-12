import { newUser } from "../../fixtures/new_user";

describe("POST /v1/users", () => {
    it("should create a user and return the correct values", () => {
        cy.api({
            url: "http://localhost:3000/v1/users",
            method: "POST",
            body: newUser
        }).then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.body).to.not.be.null;
            expect(response.body.name).to.be.equal(newUser.name);
            expect(response.body.email).to.be.equal(newUser.email);
        })
    })

    it("should return 409 if there is a user with the same email in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/users",
            method: "POST",
            body: newUser,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(409);
            expect(response.body).to.not.be.null;
            expect(response.body.message).to.be.equal("user with the same email already existe");
        })
    })
})