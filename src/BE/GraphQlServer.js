const { GraphQLServer } = require('graphql-yoga');


// 1
const typeDefs = `
type Query {
  info: String!
}
`

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone and PACK's model is Nila!!!`
  }
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

module.exports = function createGraphQlServer(){
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
  });
  const startFunction = server.start;
  server.startBD = ({port=4000, ...options})=>{
      options = Object.assign({port}, options);

      console.log('options: ', options);
      server.start(options, callback=()=>{
        console.log(`GraphQLServer running on http://localhost - port ${port}`);
      });
  }
  return server;
};
