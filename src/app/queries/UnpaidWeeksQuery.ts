import gql from 'graphql-tag/index';


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
                  userId
                }
            }
        }
    }
}`;

export default UnpaidWeeksQuery;
