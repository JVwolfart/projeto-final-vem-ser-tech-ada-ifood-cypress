import { fakerEN } from "@faker-js/faker"

export const newUser = {
    name: fakerEN.internet.userName(),
    email : fakerEN.internet.email(),
}