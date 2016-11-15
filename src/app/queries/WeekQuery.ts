import gql from 'graphql-tag/index';

const WeekQuery = gql`
    query WeekQuery($weekId: Int){
        week(weekId: $weekId) {
            __typename
            weekId
            cost
            users {
                __typename
                userId
                weekId
                slices
                paid
                user {
                    __typename
                    userId
                    avatarUrl
                    firstName
                    lastName
                }
            }
            shopper {
                __typename
                userId
                firstName
                avatarUrl
                facebookId
            }
        }
    }
`;
export default WeekQuery;
