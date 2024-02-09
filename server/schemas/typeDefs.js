const typeDefs = `
    type User {
        _id: ID
        username: String!
        password: String!
        pictures: [Picture]
    }
    type Picture {
        filename: String!
        
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        findAllUsers: [User]
        findOneUser(username: String!, password:String!): Auth
    }

    type Mutation {
        createUser(username: String!, password:String!): Auth
        loginUser(username: String!, password: String!): Auth
    }
`

module.exports = typeDefs
