import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // data sources
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});
