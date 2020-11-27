import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache(),
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
