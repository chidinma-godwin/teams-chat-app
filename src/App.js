import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ApolloClient } from "apollo-client";
// import { createUploadLink } from "apollo-upload-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import CreateTeam from "./routes/CreateTeam";
import { ApolloLink } from "apollo-link";
import decode from "jwt-decode";
import ViewTeam from "./routes/ViewTeams";

// Check if the token is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    decode(token);
    const decodedRefreshToken = decode(refreshToken);

    // If the refresh token as expired, redirect user to login page
    if (decodedRefreshToken.exp <= Math.round(new Date().getTime() / 1000)) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { info: "Please login to create a team" }
          }}
        />
      )
    }
  />
);

function App() {
  const link = new HttpLink({
    uri: "http://localhost:5000/graphql"
  });

  // Middleware to add token and refresh token from local storage to request headers
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

  // Afterware to over-write expired token
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
          <PrivateRoute
            path="/view-team/:teamId?/:channelId?"
            component={ViewTeam}
          />

          <PrivateRoute path="/create-team" component={CreateTeam} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
