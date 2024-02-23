const { User, Image, Tag } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { GraphQLError } = require('graphql')


const resolvers = {
    Query: {
         findOneUser: async (parent, args, context) => {
            if (args) {
                const user = await User.findOne({
                    username: args.username
                }).select('-__v -password').populate('uploads')
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
            const data = await User.find().populate('uploads')
            return data
        },
        findAllTags: async (parent, args) => {
            const data = await Tag.find().populate('imagesWithThisTag')
            return data
        },
        findOneTag: async (parent,args) => {
            if(args) {
                const tag = await Tag.findOne({
                    name:args.name
                })
                .populate(
                    { 
                        path: 'imagesWithThisTag',
                        populate: {
                                path: 'tags'
                        },
                        strictPopulate: false 
                    }
                )
               
                return tag
            }
            
            throw new GraphQLError('Could not find tag', {
                extensions: {
                    code: 'TAG_NOT_FOUND'
                }
            })
        },
        findAllImages: async (parent, args) => {
            const data = await Image.find().populate('tags')
            return data
        },
        findOneImage: async (parent, args) => {
            console.log(args)
            if(args) {
                const data = await Image.findOne({
                    filename: args.filename
                }).populate('tags')
                return data
            }

            throw new GraphQLError('Could not find image', {
                extensions: {
                    code: 'IMAGE_NOT_FOUND'
                }
            })
        },
        searchImages: async (parent, args) => {
            console.log(`Searchtag is ${args.searchTag}`)
            let foundImage
            if(args) {
                await Tag.find({
                    name: args.searchTag
                }).then(async function(data) {
                    console.log(data)
                    console.log(data._id)
                    let ids = []
                    data.forEach((tag) => {
                        ids.push(tag._id)
                    })
                    console.log(ids)
                    foundImage = await Image.find({
                        tags: { $all: [...ids] }
                    }).populate('tags')
                })
                return foundImage
            } 

            throw new GraphQLError('Could not find image with provided tags', {
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
            console.log(`gql filename: ${args.filename}`)
            if(args) {
                await Image.create({
                    filename: args.filename,
                    uploader: args.uploader,
                    mimetype: args.mimetype

                }).then(async function(createdImage) {
                    console.log(`New image reference created ${createdImage._id}`)
                    let matches = new Map()
                    let regex = /(?<!\S)([a-z0-9]+)_([a-z0-9]+)(?!\S)|(?<!\S)([a-z0-9*]+)(?!\S)/gm
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
            await Image.findOne(
                { filename: args.imageFilename}
            ).populate('tags').then( function(image) {
                for(let i = 0; i < image.tags.length; i++) {
                    if(image.tags[i].name == args.tagName) {
                        throw new GraphQLError('Image already has this tag', {
                            extensions: {
                                code: 'DUPLICATE_TAG_ON_IMAGE'
                            }
                        })
                    }
                }
            })
            let updatedImage;
            if(args) {
                await Tag.findOne(
                    { name: args.tagName }
                ).then(async function(tag) {
                    console.log(tag)
                    if(tag) {
                        await Image.findOneAndUpdate(
                            { filename: args.imageFilename },
                            { $push: { tags: tag._id }},
                            { new: true }
                        ).populate('tags').then((image) => {
                            updatedImage = image
                        })
                    } else {
                        await Image.findOne(
                            { filename: args.imageFilename }
                        ).then(async function(image) {
                            console.log(image)
                            await Tag.create({
                                name: args.tagName,
                                imagesWithThisTag: [image._id]
                            }).then(async function(createdTag) {
                                console.log(`createdTag ${createdTag}`)
                                await Image.findOneAndUpdate(
                                    { filename: args.imageFilename },
                                    { $push: { tags: createdTag._id }},
                                    { new: true }
                                ).populate('tags').then((image) => {
                                    updatedImage = image
                                })
                            })
                        })
                    }
                })
                console.log(updatedImage)
                return updatedImage
            }
            
            throw new GraphQLError('Unable to add tag to image', {
                extensions: {
                    code: 'UNABLE_TO_TAG_IMAGE'
                }
            })
        },
        addImageToTag: async (parent, args) => {
            if(args) {
                const data = Tag.findOneAndUpdate(
                    { _id: args.tagId },
                    { $push: { imagesWithThisTag: args.pictureId }},
                    { new: true }
                ).populate('imagesWithThisTag')
                return data
            }

            throw new GraphQLError('Unable to add image to tag', {
                extensions: {
                    code: 'UNABLE_TO_ADD_IMAGE_TO_TAG'
                }
            })

        },


    }
}

module.exports = resolvers
