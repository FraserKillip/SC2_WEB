import gql from 'graphql-tag/index';

const UpdateWeekMutation = gql`
    mutation UpdateWeek($weekId: Int, $shopperId: Int, $cost: Float) {
        updateWeek(weekId: $weekId, shopperId: $shopperId, cost: $cost) {
            __typename
            cost
            shopperUserId
            weekId
        }
    }
`;

export default UpdateWeekMutation;
