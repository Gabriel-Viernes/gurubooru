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
    mutation createImage($filename: String!, $uploader: ID, $tags: String) {
  createImage(filename: $filename, uploader: $uploader, tags:$tags) {
    filename
    score
    uploader
  }
}`

export const FIND_ALL_IMAGES = gql `
    query findAllImages {
      findAllImages {
        _id
        filename
        score
        uploader
        tags {
          _id
          name
        }
      }
    }
`
