import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://graphqlpokemon.favware.tech/v8",
    cache: new InMemoryCache(),
});

export default client;
