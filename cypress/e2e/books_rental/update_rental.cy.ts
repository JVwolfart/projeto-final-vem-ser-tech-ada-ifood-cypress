import { fakerEN } from "@faker-js/faker"
import { books, users } from "../../fixtures/new_rental"

describe("PUT /v1/rental/books/:id", () => {
    it("should update a rental and return the correct values", () => {
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
                        url: "http://localhost:3000/v1/books",
                        method: "POST",
                        body: books[1]
                    }).then(bookResponse1 => {
                        cy.api({
                            url: "http://localhost:3000/v1/users",
                            method: "POST",
                            body: users[1]
                        }).then(userResponse1 => {
                            const updateRental = {
                                book_id: bookResponse1.body.id,
                                user_id: userResponse1.body.id,
                                rented_at: fakerEN.date.anytime(),
                                rental_time: fakerEN.date.anytime(),
                            }
                            cy.api({
                                url: "http://localhost:3000/v1/rental/books/" + rentalResponse.body.id,
                                method: "PUT",
                                body: updateRental,
                                failOnStatusCode: false
                            }).then(response => {
                                expect(response.status).to.be.equal(200);
                                expect(response.body.book_id).to.be.equal(updateRental.book_id);
                                expect(response.body.user_id).to.be.equal(updateRental.user_id);
                            })
                        })
                    })
                })
            })
        })
    })

    it("should return 404 if the provided id is not in the database", () => {
        const updateRental = {
            book_id: fakerEN.string.uuid(),
            user_id: fakerEN.string.uuid(),
            rented_at: fakerEN.date.anytime(),
            rental_time: fakerEN.date.anytime(),
        }
        cy.api({
            url: "http://localhost:3000/v1/rental/books/" + fakerEN.string.uuid(),
            method: "PUT",
            body: updateRental,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(404);
            expect(response.body.message).to.be.equal("rental not found");
        })
    })

    it("should return 404 if the provided id is not in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "POST",
            body: books[2],
            failOnStatusCode: false
        }).then(bookResponse => {
            cy.api({
                url: "http://localhost:3000/v1/users",
                method: "POST",
                body: users[2],
                failOnStatusCode: false
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
                        url: "http://localhost:3000/v1/books",
                        method: "POST",
                        body: books[3],
                        failOnStatusCode: false
                    }).then(bookResponse1 => {
                        cy.api({
                            url: "http://localhost:3000/v1/users",
                            method: "POST",
                            body: users[3],
                            failOnStatusCode: false
                        }).then(userResponse1 => {
                            const secondRental = {
                                book_id: bookResponse1.body.id,
                                user_id: userResponse1.body.id,
                                rented_at: fakerEN.date.anytime(),
                                rental_time: fakerEN.date.anytime(),
                            }
                            cy.api({
                                url: "http://localhost:3000/v1/rental/books/",
                                method: "POST",
                                body: secondRental,
                                failOnStatusCode: false
                            }).then(rentalResponse1 => {
                                const updateRental= {
                                    book_id: rentalResponse1.body.book_id,
                                    user_id: rentalResponse.body.user_id,
                                    rented_at: rentalResponse.body.rented_at,
                                    rental_time: rentalResponse.body.rental_time,
                                }
                                cy.api({
                                    url: "http://localhost:3000/v1/rental/books/" + rentalResponse.body.id,
                                    method: "PUT",
                                    body: updateRental,
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
        })
    })
})