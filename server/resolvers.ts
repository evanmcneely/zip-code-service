import axios from 'axios';
import { ZipCodeSearchInput, APIResponse, ZippopotamusResponse } from '../@types/APITypes';

const resolvers = {
  Query: {
    zipCodeSearch: async (
      _: any,
      args: { searchInput: ZipCodeSearchInput }
    ): Promise<APIResponse | Error> => {
      const { countryCode, zipCode } = args.searchInput;
      // sanitize data before making the request to Zippopotamus
      // GraphQL validation will handle countryCode formatting, not checking that hear
      // should use regex for better validation
      if (
        (countryCode === 'CA' && zipCode.length !== 6) ||
        (countryCode === 'US' && zipCode.length !== 5)
      ) {
        return new Error('Improperly formated request');
      }

      const queryCode = countryCode === 'CA' ? zipCode.slice(0,3) : zipCode

      try {
        const response: { data: ZippopotamusResponse } = await axios.get(
          `http://api.zippopotam.us/${countryCode}/${queryCode}`
        );

        // if there are more than 1 places for the ZipCode, use the first place and append "area" to signify that the surrouding area is included
        return {
          code: response.data['post code'],
          cityName:
            response.data.places.length > 1
              ? `${response.data.places[0]['place name']} area`
              : response.data.places[0]['place name'],
          stateName: response.data.places[0].state,
          countryName: response.data.country,
          stateAbrev: response.data.places[0]['state abbreviation'],
          countryAbrev: response.data['country abbreviation'],
          long: response.data.places[0].longitude,
          lat: response.data.places[0].latitude,
        };
      } catch (err) {
        console.log(err)
        // catch all error handler for failed ZipCode queries
        // should have better error handling for codes that don't exist vs other network errors
        return new Error('The service may be down or the Zip Code does not exist');
      }
    },
  },
};

export default resolvers;
