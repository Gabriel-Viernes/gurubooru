//node_modules imports
const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path')

//server files imports
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')
const { authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});



const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'images')))

    app.use('/graphql', expressMiddleware(server, {
          context: authMiddleware
      }))

    


    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`===================================`)
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        console.log(`===================================`)
      });
    });
};

startApolloServer();

