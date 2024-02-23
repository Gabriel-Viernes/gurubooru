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
    mutation createImage($filename: String!, $uploader: ID, $tags: String, $mimetype: String!) {
  createImage(filename: $filename, uploader: $uploader, tags:$tags, mimetype: $mimetype) {
    filename
    score
    uploader
  }
}`

export const ADD_TAG = gql `
    mutation addTag($imageFilename: String!, $tagName: String!) {
      addTag(imageFilename: $imageFilename, tagName: $tagName) {
        _id
        filename
        mimetype
        score
        tags {
          name
        }
        uploader
      }
    }
`
