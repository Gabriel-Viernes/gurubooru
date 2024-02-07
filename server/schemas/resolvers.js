const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {

    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user}
        }
    }
}

module.exports = resolvers
