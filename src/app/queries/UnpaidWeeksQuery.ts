import gql from 'graphql-tag';


const UnpaidWeeksQuery = gql`{
    me {
        __typename
        userId
        weeks(unpaidOnly: true) {
            __typename
            weekId
            userId
            week {
                __typename
                weekId
                cost
                users {
                  __typename
                  weekId
                  userId
                }
            }
        }
    }
}`;

export default UnpaidWeeksQuery;
