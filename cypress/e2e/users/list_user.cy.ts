import { newUser } from "../../fixtures/new_user";

describe("GET /v1/users", () => {
    it("should get all users created in the database", () => {
        cy.api({
            url: "http://localhost:3000/v1/users",
            method: "POST",
            body: newUser
        }).then((response) => {
            cy.wrap(response.body).as('newUser')
        })
        cy.get('@newUser')
        .then((user: any) => {
            cy.api({
                url: "http://localhost:3000/v1/users",
                method: "GET"
            }).then((response) => {
                expect(response.status).to.be.equal(200);
                expect(response.body).to.not.be.empty;
                expect(response.body.length).to.be.greaterThan(1);
            
                const existUser = response.body.find(item => item.id === user.id);

                expect(existUser).to.not.be.empty;
                expect(existUser.name).to.be.equal(user.name);
                expect(existUser.email).to.be.equal(user.email);
            })
        })
    })
})