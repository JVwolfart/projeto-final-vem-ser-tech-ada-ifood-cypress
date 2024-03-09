import { newBook } from "../../fixtures/new_book"

describe("POST /v1/books", () => {
    it("should create a book and return the correct values", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: newBook
        }).then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.body.title).to.be.equal(newBook.title);
        })
    })

    it("should return 409 if there is a book with the same title in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: newBook,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(409);
            expect(response.body.message).to.be.equal("book with the same title already existe");
        })
    })
})