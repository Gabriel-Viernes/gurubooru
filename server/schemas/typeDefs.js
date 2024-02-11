
const typeDefs = `


    type User {
        _id: ID
        username: String!
        password: String!
        uploads: [Image]
        
    }

    type Image {
        _id: ID
        filename: String!
        uploader: ID
        tags: [Tag]
        score: Int!
    }

    type Tag {
        _id: ID
        name: String!
        imagesWithThisTag:[Image]
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query {
        findAllUsers: [User]
        findOneUser(username: String!, password:String!): Auth
        findAllTags: [Tag]
        findOneTag(name: String!): Tag
        findAllImages: [Image]
        findOneImage(filename: String!): Image

    }

    type Mutation {
        createUser(username: String!, password:String!): Auth
        loginUser(username: String!, password: String!): Auth
        createImage(filename: String!, uploader: ID, tags: String): Image
        createTag(name: String!): Tag
        addTag(pictureId: ID!, tagId: ID!): Image
        addImageToTag(pictureId: ID!, tagId:ID!): Tag
    }
`

module.exports = typeDefs
