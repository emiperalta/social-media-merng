import App from './App';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

// configuration to 'sign' requests for graphql operations
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getPosts: {
                        merge(existing = [], incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
    connectToDevTools: true,
});

const ApolloProviderComponent = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
};

export default ApolloProviderComponent;
