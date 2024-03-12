import { fakerEN } from "@faker-js/faker";
import { newUser } from "../../fixtures/new_user";
import { updateUser } from "../../fixtures/update_user";
import { firstUser } from "../../fixtures/first_user";

describe("PUT /v1/users/:id", () => {
    it("should update a user and return the correct values", () => {
        cy.api({
            url: "http://localhost:3000/v1/users",
            method: "POST",
            body: newUser
        }).then(createUserResponse => {
            cy.api({
                url: `http://localhost:3000/v1/users/${createUserResponse.body.id}`,
                method: "PUT",
                body: updateUser
            }).then(response => {
                expect(response.status).to.be.equal(200);
                expect(response.body).to.not.be.empty;
                expect(response.body.id).to.be.equal(createUserResponse.body.id);
                expect(response.body.name).to.be.equal(updateUser.name);
                expect(response.body.email).to.be.equal(updateUser.email);
            })
        })
    })

    it("should return 409 and not update the user if a user with the same email already exists", () => {
        cy.api({
            url: "http://localhost:3000/v1/users",
            method: "POST",
            body: firstUser
        }).then(_firstResponse => {
            cy.api({
                url: "http://localhost:3000/v1/users",
                method: "POST",
                body: newUser
            }).then(responseUser => {
                cy.api({
                    url: `http://localhost:3000/v1/users/${responseUser.body.id}`,
                    method: "PUT",
                    body: firstUser,
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.be.equal(409);
                    expect(response.body.message).to.be.equal("there is already a user with the same email provided");
                })
            })
        })
    })

    it("should return 404 if the provided id is not in the database", () => {
        cy.api({
            url: `http://localhost:3000/v1/users/${fakerEN.string.uuid()}`,
            method: "PUT",
            body: newUser,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(404);
            expect(response.body.message).to.be.equal("any user with the id provided was founded");
        })
    })
})