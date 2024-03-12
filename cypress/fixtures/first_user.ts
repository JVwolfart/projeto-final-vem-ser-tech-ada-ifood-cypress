import { fakerEN } from "@faker-js/faker"

export const firstUser = {
    name: fakerEN.internet.userName(),
    email : fakerEN.internet.email(),
}