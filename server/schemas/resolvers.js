const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {

    },
    Mutations: {
        createUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user}
        }
    }
}
