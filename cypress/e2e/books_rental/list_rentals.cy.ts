describe("GET /v1/rental/books", () => {
    it("should return all rentals in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/rental/books",
            method: "GET"
        }).then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body.length).to.be.greaterThan(1);
        })
    })
})