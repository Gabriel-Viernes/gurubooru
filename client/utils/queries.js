import { gql } from '@apollo/client'

export const FIND_ONE_IMAGE = gql `
    query findOneImage($filename: String!) {
      findOneImage(filename: $filename) {
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
        mimetype
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

export const SEARCH_IMAGES = gql `
    query searchImages($searchTag: [String]) {
      searchImages(searchTag: $searchTag) {
        _id
        filename
        score
        tags {
          name
        }
        uploader
        mimetype
      }
    }
`
