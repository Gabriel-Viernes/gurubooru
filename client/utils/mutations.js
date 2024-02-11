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

export const CREATE_IMAGE = gql `
    mutation createImage($filename: String!, $uploader: ID) {
  createImage(filename: $filename, uploader: $uploader) {
    filename
    score
    uploader
  }
}

`
