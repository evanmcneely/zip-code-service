import { gql } from 'apollo-server';

const typeDefs = gql`
    
    type Query {
        zipCodeSearch(searchInput: SearchInput): ZipCode
    }
    
    type ZipCode {
        code: String
        cityName: String
        stateName: String
        countryName: String
        stateAbrev: String
        countryAbrev: String
        long: String
        lat: String
    }

    # limit supported countries to Canada and US
    enum SupportedCountries {
        CA
        US
    }

    input SearchInput {
        countryCode: SupportedCountries # add a default value to US here?
        zipCode: String
    }
`;

export default typeDefs;
