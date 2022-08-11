const resolvers = {
  Query: {
    zipCodeSearch: (_, args) => {
      const { countryCode, ZipCode } = args;
      // data source?
    },
  },
};

export default resolvers;
