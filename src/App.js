import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
// import { createUploadLink } from "apollo-upload-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateTeam from "./components/CreateTeam";
import { ApolloLink } from "apollo-link";

function App() {
  const link = new HttpLink({
    uri: "http://localhost:5000/graphql"
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
      headers: {
        ...headers,
        "x-token": token,
        "x-refresh-token": refreshToken
      }
    };
  });

  const addHeader = new ApolloLink((operation, forward) => {
    const { headers } = operation.getContext();
    console.log(headers);

    if (headers) {
      // Get the token and refresh token fron the response header
      const token = headers.get("x-token");

      const refreshToken = headers.get("x-refresh-token");

      localStorage.setItem("x-token", token);

      localStorage.setItem("x-refresh-token", refreshToken);
    }

    return forward(operation);
  });

  const client = new ApolloClient({
    link: addHeader.concat(authLink.concat(link)),
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/create-team" component={CreateTeam} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
