import gql from 'graphql-tag';

export const UserQuery = gql`
    query {
        me {
            __typename
            ... userFields
        }
        primaryShopper {
            firstName
            bankName
            bankDetails
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
