import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  const link = createUploadLink({
    uri: "http://localhost:5000/graphql"
  })

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={Register} />
        </Switch>

      </Router>

    </ApolloProvider>
  );
}

export default App;
