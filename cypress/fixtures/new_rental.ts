import { fakerEN } from "@faker-js/faker"

export const books = [
    {
        title: fakerEN.word.words(),
        subtitle: fakerEN.word.words(),
        publishing_company: fakerEN.company.name(),
        published_at: fakerEN.date.anytime(),
        authors: fakerEN.internet.userName(),
    },
    {
        title: fakerEN.word.words(),
        subtitle: fakerEN.word.words(),
        publishing_company: fakerEN.company.name(),
        published_at: fakerEN.date.anytime(),
        authors: fakerEN.internet.userName(),
    },
    {
        title: fakerEN.word.words(),
        subtitle: fakerEN.word.words(),
        publishing_company: fakerEN.company.name(),
        published_at: fakerEN.date.anytime(),
        authors: fakerEN.internet.userName(),
    },
    {
        title: fakerEN.word.words(),
        subtitle: fakerEN.word.words(),
        publishing_company: fakerEN.company.name(),
        published_at: fakerEN.date.anytime(),
        authors: fakerEN.internet.userName(),
    },
]

export const users = [
    {
        name: fakerEN.internet.userName(),
        email: fakerEN.internet.email(),
    },
    {
        name: fakerEN.internet.userName(),
        email: fakerEN.internet.email(),
    },
    {
        name: fakerEN.internet.userName(),
        email: fakerEN.internet.email(),
    },
    {
        name: fakerEN.internet.userName(),
        email: fakerEN.internet.email(),
    },
]