import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

// 2
const httpLink = new HttpLink({ uri: 'https://www.yammer.com/graphql' });
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('YAMMER_AUTH_TOKEN');
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation)
})

// use with apollo-client
const errorLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    window.location.replace('https://www.yammer.com/dialog/oauth?client_id=5hFM4jak52LokZ8aVbbQ&response_type=token');
  }
})
const link = errorLink.concat(middlewareLink.concat(httpLink));

// 3
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker()