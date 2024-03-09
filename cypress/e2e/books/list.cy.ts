describe("GET /v1/books", () => {
    it("should return all books in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/books",
            method: "GET"
        }).then((response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body.length).to.be.greaterThan(1);
        })
    })
})