import { fakerEN } from "@faker-js/faker";
import { books, users } from "../../fixtures/new_rental";

describe("POST /v1/rental/books", () => {
    it("should create a rental and return the correct values", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: books[0]
        }).then(bookResponse => {
            cy.api({
                url: "http://localhost:3000/v1/users",
                method: "POST",
                body: users[0]
            }).then(userResponse => {
                const newRental = {
                    book_id: bookResponse.body.id,
                    user_id: userResponse.body.id,
                    rented_at: fakerEN.date.anytime(),
                    rental_time: fakerEN.date.anytime(),
                }
                cy.api({
                    url: "http://localhost:3000/v1/rental/books/",
                    method: "POST",
                    body: newRental,
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.be.equal(201);
                    expect(response.body.book_id).to.be.equal(bookResponse.body.id);
                    expect(response.body.user_id).to.be.equal(userResponse.body.id);
                })
            })
        })
    })

    it("should return 409 if the book is already rented", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: books[1]
        }).then(bookResponse => {
            cy.api({
                url: "http://localhost:3000/v1/users",
                method: "POST",
                body: users[1]
            }).then(userResponse => {
                const newRental = {
                    book_id: bookResponse.body.id,
                    user_id: userResponse.body.id,
                    rented_at: fakerEN.date.anytime(),
                    rental_time: fakerEN.date.anytime(),
                }
                cy.api({
                    url: "http://localhost:3000/v1/rental/books/",
                    method: "POST",
                    body: newRental,
                    failOnStatusCode: false
                }).then(rentalResponse => {
                    const alreadyRented = {...newRental};
                    cy.api({
                        url: "http://localhost:3000/v1/rental/books/",
                        method: "POST",
                        body: alreadyRented,
                        failOnStatusCode: false
                    }).then(response => {
                        expect(response.status).to.be.equal(409);
                        expect(response.body.message).to.be.equal("book already rented");
                    })
                })
            })
        })
    })
})