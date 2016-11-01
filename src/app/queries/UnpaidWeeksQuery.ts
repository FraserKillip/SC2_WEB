import gql from 'graphql-tag/index';


const UnpaidWeeksQuery = gql`{
    me {
        weeks(unpaidOnly: true) {
            week {
                cost
            }
        }
    }
}`;

export default UnpaidWeeksQuery;
