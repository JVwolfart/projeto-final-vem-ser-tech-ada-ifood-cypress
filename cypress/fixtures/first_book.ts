import { fakerEN } from "@faker-js/faker"

export const firstBook = {
    title: fakerEN.word.words(),
    subtitle: fakerEN.word.words(),
    publishing_company: fakerEN.company.name(),
    published_at: fakerEN.date.anytime(),
    authors: fakerEN.internet.userName(),
}