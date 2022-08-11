import axios from 'axios';
import { APIResponse } from '../@types/ZippopotamusTypes';
import { ZipCodeSearchInput } from '../@types/APITypes';

const resolvers = {
  Query: {
    zipCodeSearch: async (_: any, args: ZipCodeSearchInput): Promise<APIResponse | Error> => {
      const { countryCode, zipCode } = args;

      // sanitize data before making the request to Zippopotamus
      // GraphQL validation will handle countryCode formatting, not checking that hear
      if (zipCode.length !== 6) {
        return new Error('improperly formated request');
      }

      const response: APIResponse = await axios.get(
        `http://api.zippopotam.us/${countryCode}/${zipCode}`
      );

      // error handling

      console.log(response);
      return response;
    },
  },
};

export default resolvers;
