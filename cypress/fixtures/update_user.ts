import { fakerEN } from "@faker-js/faker"

export const updateUser = {
    name: fakerEN.internet.userName(),
    email : fakerEN.internet.email(),
}