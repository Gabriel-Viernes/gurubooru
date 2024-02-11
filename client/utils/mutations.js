import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(username: $username, password:$password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const LOGIN_USER = gql `
    mutation loginUser($username:String!, $password: String!) {
        loginUser (username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`
