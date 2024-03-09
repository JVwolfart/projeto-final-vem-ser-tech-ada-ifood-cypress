import { fakerEN } from "@faker-js/faker"
import { newBook } from "../../fixtures/new_book"

describe("DELETE /v1/books/:id", () => {
    it("should delete book and return empty body", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: newBook
        }).then(responseBook => {
            cy.api({
                url: "http://localhost:3000/v1/books/" + responseBook.body.id,
                method: "DELETE",
            }).then(response => {
                expect(response.status).to.be.equal(200);
                expect(response.body).to.be.empty;
            })
        })
    })

    it("should return 404 if the provided id is not in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/books/" + fakerEN.string.uuid(),
            method: "DELETE",
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(404);
            expect(response.body.message).to.be.equal("any book with the id provided was founded");
        })
    })
})