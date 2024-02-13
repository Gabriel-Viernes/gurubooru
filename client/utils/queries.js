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

export const FIND_ONE_TAG = gql `
    query FindOneTag($name: String!) {
      findOneTag(name: $name) {
        _id
        imagesWithThisTag {
          uploader
          score
          filename
          _id
          tags {
            name
          }
        }
        name
      }
    }

`
