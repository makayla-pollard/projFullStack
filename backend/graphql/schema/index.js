const { buildSchema } = require('graphql');

module.exports= buildSchema(`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    firstName: String!
    lastName: String!
}

type LoginData {
    userId: ID!
    token: String!
    tkExp: Int!
    username: String!
}

type Review{
    _id: ID!
    username: String!
    movieId: Int!
    rating: Int!
    comment: String
}

input UserInput {
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
}

input ReviewInput {
    username: String!
    movieId: Int!
    rating: Int!
    comment: String
}

type RootQuery {
    users: [User!]!
    reviews: [Review!]!
    userById(id: String!): User!
    userByUsername(username: String!): User!
    reviewsByMovie(movieId: Int!): [Review!]!
    reviewByUsernameAndMovie(username: String!, movieId: Int!): Review!
    reviewsByUsername(username: String!): [Review!]!
    login(username: String!, password: String!): LoginData!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createReview(reviewInput: ReviewInput): Review
    editReview(username: String!, movieId: Int!, rating: Int!, comment: String): Review
    deleteReview(username: String!, movieId: Int!): Boolean
    deleteUser(username: String!): Boolean
    deleteReviews(username: String!): Boolean
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)