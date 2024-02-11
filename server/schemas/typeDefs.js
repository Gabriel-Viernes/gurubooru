
const typeDefs = `


    type User {
        _id: ID
        username: String!
        password: String!
        pictures: [Picture]
    }

    type image {
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
        createImage(filename: String!, uploader: ID): Image
    }
`

module.exports = typeDefs
