import { gql } from 'apollo-server';

const typeDefs = gql`
    
    type Query {
        zipCodeSearch(SearchInput!): ZipCode
    }
    
    type ZipCode {
        code
        cityName
        stateName
        countryName
        stateAbrev
        countryAbrev
        long
        lat
    }

    # limit supported countries to Canada and US
    enum SupportedCountries {
        CA
        US
    }

    input SearchInput {
        countryCode: SupportedCountries # add a default value to US here?
        zipCode: String!
    }
`;

export default typeDefs;
