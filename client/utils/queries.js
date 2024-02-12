import { gql } from '@apollo/client'

export const FIND_ONE_USER = gql `
    query findOneUser($username: String!, $password:String!) {
        user {
            username
            password
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
