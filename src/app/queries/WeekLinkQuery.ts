import gql from 'graphql-tag/index';

const WeekLinkQuery = gql`
    query WeekQuery($weekId: Int){
        weekLink(weekId: $weekId) {
            __typename
            weekId
            userId
            paid
            slices
        }
    }
`;
export default WeekLinkQuery;
