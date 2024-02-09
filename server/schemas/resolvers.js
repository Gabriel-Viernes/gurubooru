const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {

    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                console.log('parent',{parent})
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
