import { useState } from 'react'
import './App.css'

import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { Outlet } from 'react-router-dom'

const httpLink = createHttpLink({
    uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache
})

//local dev
//'http://localhost:3001'
//'http://localhost:3002'

//production
//'https://gurubooru-275b322c18f4.herokuapp.com/'
//'https://gurubooru-image-server-5f422bc852c2.herokuapp.com/'


function App() {
    const [url, setUrl] = useState('http://localhost:3001')
    const [imageServerUrl, setImageServerUrl] = useState('http://localhost:3002')

    console.log(url)

    return (
        <ApolloProvider client={client}>
            <Outlet url={url} imageServerUrl={imageServerUrl} />
        </ApolloProvider>
    )
}

export default App
