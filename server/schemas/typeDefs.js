const typeDefs = `
    type User {
        username: String!
        password: String!
        pictures: [Picture]
    }
    type Picture {
        filename: String!
        
    }
    type Query {
        Users: [User]
    }
    type Mutation {
        _dummyMutation: String    
    }
`

module.exports = typeDefs
