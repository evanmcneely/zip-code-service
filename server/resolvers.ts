import axios from 'axios';
import { ZippopotamusResponse } from '../@types/ZippopotamusTypes';
import { ZipCodeSearchInput, APIResponse } from '../@types/APITypes';

const resolvers = {
  Query: {
    zipCodeSearch: async (
      _: any,
      args: { searchInput: ZipCodeSearchInput }
    ): Promise<APIResponse | Error> => {
      const { countryCode, zipCode } = args.searchInput;
      console.log(countryCode, zipCode);
      // sanitize data before making the request to Zippopotamus
      // GraphQL validation will handle countryCode formatting, not checking that hear
      if (
        (countryCode === 'CA' && zipCode.length !== 6) ||
        (countryCode === 'US' && zipCode.length !== 5)
      ) {
        return new Error('improperly formated request');
      }

      try {
        const response: { data: ZippopotamusResponse } = await axios.get(
          `http://api.zippopotam.us/${countryCode}/${zipCode}`
        );

        return {
          code: response.data['post code'],
          cityName: response.data.places[0]['place name'],
          stateName: response.data.places[0].state,
          countryName: response.data.country,
          stateAbrev: response.data.places[0]['state abbreviation'],
          countryAbrev: response.data['country abbreviation'],
          long: response.data.places[0].longitude,
          lat: response.data.places[0].latitude,
        };
      } catch (err) {
        return new Error('Error processing your request. Try again later.');
      }
    },
  },
};

export default resolvers;
