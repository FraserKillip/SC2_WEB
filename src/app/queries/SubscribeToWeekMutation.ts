import gql from 'graphql-tag';

const SubscribeToWeekMutation = gql`
    mutation SubscribeToWeek($slices: Int, $userId: Int, $weekId: Int) {
        subscribeToWeek(slices: $slices, userId: $userId, weekId: $weekId) {
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

export default SubscribeToWeekMutation;
