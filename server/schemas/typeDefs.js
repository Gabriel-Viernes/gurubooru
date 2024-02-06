const typeDefs = `
    type User {
        username: String!
        password: String!
        pictures: [Picture]
    }
    type Picture {
        filename: String!
        
    }
    type Auth {
        token:ID!
        user:User
    }
    type Query {
        Users: [User]
    }

    type Mutation {
        createUser(username: String!, password:String!): Auth
    }
`

module.exports = typeDefs
