import { fakerEN } from "@faker-js/faker";
import { newBook } from "../../fixtures/new_book";

describe("GET /v1/books/:id", () => {
    it("should return a book with the provided id", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: newBook
        }).then(responseBook => {
            cy.api({
                url: "http://localhost:3000/v1/books/" + responseBook.body.id,
                method: "GET",
            }).then(response => {
                expect(response.status).to.be.equal(200);
                expect(response.body.id).to.be.equal(responseBook.body.id);
            })
        })
    })

    it("should return 204 with empty body if the provided id is not in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/books/" + fakerEN.string.uuid(),
            method: "GET",
        }).then(response => {
            expect(response.status).to.be.equal(204);
            expect(response.body).to.be.empty;
        })
    })
})