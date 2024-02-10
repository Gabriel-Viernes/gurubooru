const { User } = require('../models')
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
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                console.log('parent',{parent})
                console.log('args',{args})
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
    }
}

module.exports = resolvers
