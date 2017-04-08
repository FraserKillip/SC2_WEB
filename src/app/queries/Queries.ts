import gql from 'graphql-tag';

export const MeQuery = gql`
    query {
        me {
            __typename
            ... userFields
        }
    }
    fragment userFields on user {
        avatarUrl
        bankDetails
        bankName
        email
        facebookId
        firstLogin
        firstName
        lastName
        phoneNumber
        shopper
        userId
        totalCost
        totalPaid
    }
`;
