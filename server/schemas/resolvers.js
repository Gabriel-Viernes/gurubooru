const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { GraphQLError } = require('graphql')

const resolvers = {
    Query: {
         findOneUser: async (parent, args, context) => {
            console.log(context.User)
            if (args) {
                console.log(args)
                const data = await User.findOne({
                    username: args.username,
                    password: args.password
                })
                console.log(data)
                return data
            }

            throw new GraphQLError('Could not authenticate user', {
                extensions: {
                    code: 'LMAO'
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
                    }
    }
}

module.exports = resolvers
