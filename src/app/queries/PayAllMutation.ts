import gql from 'graphql-tag';

const PayAllMutation = gql`
    mutation MarkAllWeeksPaidForUser($userId: Int) {
        markAllWeeksPaidForUser(userId: $userId) {
            __typename
        }
    }
`;

export default PayAllMutation;
