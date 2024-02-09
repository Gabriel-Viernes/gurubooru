import { gql } from '@apollo/client'

export const FIND_ONE_USER = gql `
    query findOneUser($username: String!, $password:String!) {
        user {
            username
            password
        }
    }`