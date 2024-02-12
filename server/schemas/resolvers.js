const { User, Image, Tag } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { GraphQLError } = require('graphql')


const resolvers = {
    Query: {
         findOneUser: async (parent, args, context) => {
            if (args) {
                const user = await User.findOne({
                    username: args.username
                }).select('-__v -password')
                const token = signToken(user)
                console.log({ token, user})
                return ({ token, user })
            }

            throw new GraphQLError('Could not authenticate user', {
                extensions: {
                    code: 'USER_CREATION_AUTHENTICATION_FAILED'
                }
            }

            )
        },
        findAllUsers: async (parent, args) => {
            const data = await User.find()
            return data
        },
        findAllTags: async (parent, args) => {
            const data = await Tag.find()
            return data
        },
        findOneTag: async (parent,args) => {
            if(args) {
                const tag = await Tag.findOne({
                    name:args.name
                })
                return tag
            }
            
            throw new GraphQLError('Could not find tag', {
                extensions: {
                    code: 'TAG_NOT_FOUND'
                }
            })
        },
        findAllImages: async (parent, args) => {
            const data = await Image.find()
            return data
        },
        findOneImage: async (parent, args) => {
            if(args) {
                const data = await Image.findOne({
                    filename: args.filename
                })
                return data
            }

            throw new GraphQLError('Could not find image', {
                extensions: {
                    code: 'IMAGE_NOT_FOUND'
                }
            })
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                const user = await User.create(args)
                const token = signToken(user)
                return { token, user}
            } catch(err) {
                console.log(err)
            }
        },
        loginUser: async (parent, args) => {
            if (args) {
                const user = await User.findOne({
                    username: args.username,
                })
            if(!user) {
                throw new GraphQLError('No user found with that username!', {
                    extensions: {
                        code: 'LOGIN_AUTHENTICATION_FAILED'
                    }
                })
            }
            const passwordVerification = await user.isCorrectPassword(args.password)
            if(passwordVerification === false) {
                throw new GraphQLError('Incorrect password!', {
                        extensions: {
                            code: 'LOGIN_AUTHENTICATION_FAILED'
                        }
                })
            }
            const token = signToken(user)
            return ({ token, user })
            }

            throw new GraphQLError('Could not authenticate user', {
                extensions: {
                    code: 'LOGIN_AUTHENTICATION_FAILED'
                }
            })
        },
        createImage: async (parent, args) => {
            let createdImage
            if(args) {
                await Image.create({
                    filename: args.filename,
                    uploader: args.uploader
                }).then(async function(createdImage) {
                    console.log(`New image reference created ${createdImage._id}`)
                    let matches = new Map()
                    let regex = /(?<!\S)([a-z]+)_([a-z]+)(?!\S)|(?<!\S)([a-z]+)(?!\S)/gm
                    let foundTags = [...args.tags.matchAll(regex)]
                    foundTags.map((match) => {
                        matches.set(match[0],match[0])
                    })
                    matches.forEach(async function(match) {
                        await Tag.findOne({ name: match}).then(async function(matchedTag) {
                            console.log(`matchedTag is ${matchedTag}`)
                            //data is either null or a Tag object
                            if(matchedTag === null) {
                                await Tag.create({
                                    name: match,
                                    imagesWithThisTag: [{_id: createdImage._id}]
                                }).then(async function(createdTag) {
                                    console.log(createdTag)
                                    await Image.findOneAndUpdate(
                                        { _id: createdImage._id },
                                        { $push: { tags: createdTag._id }},
                                        { new: true }
                                    ).then((data) => console.log(`tag added to image ${data}`))
                                })
                            } else {
                                await Image.findOneAndUpdate(
                                    { _id: createdImage._id },
                                    { $push: { tags: matchedTag._id }},
                                    { new: true }
                                ).then((data) => console.log(`tag added to image ${data}`))
                            }
                        })
                    })

                })
                                return args
            }
            
        },
        createTag: async (parent, args) => {
            console.log(args)
            if(args) {
                const newTag = await Tag.create({
                    name: args.name,
                    imagesWithThisTag: args.imagesWithThisTag
                })
                return newTag
            } 

            throw new GraphQLError('Unable to create tag', {
                extensions: {
                    code: 'UNABLE_TO_CREATE_TAG'
                }
            })
        },
        addTag: async (parent, args) => {
            if(args) {
                const data = Image.findOneAndUpdate(
                    { _id: args.pictureId },
                    { $push: { tags: args.tagId }},
                    { new: true }
                )
                return data
            }
            
            throw new GraphQLError('Unable to add tag to image', {
                extensions: {
                    code: 'UNABLE_TO_TAG_IMAGE'
                }
            })
        },
        addImageToTag: async (parent, args) => {
            return 'lmao'
        },


    }
}

module.exports = resolvers
