import gql from 'graphql-tag/index';

const SubscribeToWeekMutation = gql`
    mutation SubscriveToWeek($slices: Int, $userId: Int, $weekId: Int){
        subscibeToWeek(slices: $slices, userId: $userId, weekId: $weekId) {
            paid
        }
    }
`;

export default SubscribeToWeekMutation;
