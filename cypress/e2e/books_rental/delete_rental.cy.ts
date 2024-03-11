import { fakerEN } from "@faker-js/faker"
import { books, users } from "../../fixtures/new_rental"

describe("GET /v1/rental/books/:id", () => {
    it("should delete rental and return empty body", () => {
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
                }).then(rentalResponse => {
                    cy.api({
                        url: "http://localhost:3000/v1/rental/books/" + rentalResponse.body.id,
                        method: "DELETE",
                        failOnStatusCode: false
                    }).then(response => {
                        expect(response.status).to.be.equal(200);
                        expect(response.body).to.be.empty;
                    })
                })
            })
        })
    })

    it("should return empty body with status code 204 if the id provided is not present in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/rental/books/" + fakerEN.string.uuid(),
            method: "DELETE",
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(409);
            expect(response.body.message).to.be.equal("any book rental with the id provided was founded");
        }) 
    })
})