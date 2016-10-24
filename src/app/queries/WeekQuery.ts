import gql from 'graphql-tag/index';

const WeekQuery = gql`
    query WeekQuery($weekId: Int){
        week(weekId: $weekId) {
            cost
            users {
                slices
                paid
                user {
                    userId
                    avatarUrl
                    firstName
                    lastName
                }
            }
        }
    }
`;
export default WeekQuery;
