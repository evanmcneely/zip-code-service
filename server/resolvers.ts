import axios from 'axios';

const resolvers = {
  Query: {
    zipCodeSearch: async (_, args: ZipCodeSearchInput): Promise<APIResponse | Error> => {
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
