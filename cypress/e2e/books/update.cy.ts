import { fakerEN } from "@faker-js/faker";
import { firstBook } from "../../fixtures/first_book";
import { newBook } from "../../fixtures/new_book";
import { updateBook } from "../../fixtures/update_book";

describe("PUT /v1/books/:id", () => {
    it("should update a book and return the correct values", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: newBook
        }).then(responseBook => {
            cy.api({
                url: "http://localhost:3000/v1/books/" + responseBook.body.id,
                method: "PUT",
                body: updateBook
            }).then(response => {
                expect(response.status).to.be.equal(200);
                expect(response.body.id).to.be.equal(responseBook.body.id);
                expect(response.body.title).to.be.equal(updateBook.title);
            })
        })
    })

    it("should return 409 and not update the book if a book with the same title already exists", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: firstBook
        }).then(_firstResponse => {
            cy.api({
                url: "http://localhost:3000/v1/books",
                method: "POST",
                body: newBook
            }).then(responseBook => {
                cy.api({
                    url: "http://localhost:3000/v1/books/" + responseBook.body.id,
                    method: "PUT",
                    body: firstBook,
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.be.equal(409);
                    expect(response.body.message).to.be.equal("there is already a book with the same title provided");
                })
            })
        })
    })

    it("should return 404 if the provided id is not in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/books/" + fakerEN.string.uuid(),
            method: "PUT",
            body: newBook,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(404);
            expect(response.body.message).to.be.equal("any book with the id provided was founded");
        })
    })
})