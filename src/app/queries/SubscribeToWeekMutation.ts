import gql from 'graphql-tag/index';

const SubscribeToWeekMutation = gql`
    mutation SubscribeToWeek($slices: Int, $userId: Int, $weekId: Int) {
        subscribeToWeek(slices: $slices, userId: $userId, weekId: $weekId) {
            __typename
            weekId
            paid
        }
    }
`;

export default SubscribeToWeekMutation;
