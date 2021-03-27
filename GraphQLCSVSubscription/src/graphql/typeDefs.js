import {gql} from 'apollo-server'

export const typeDefs = gql`
    type Row {
        date: String!
        value: Float!
        name: String!
        email: String!
        address: String!
    }
    type Query {
        hello: String!
        csvData: [Row]!
    }
`

