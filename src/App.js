import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginForm";
import DashBoard from "./pages/DashBoard/Dashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Course from "./pages/Course/Course";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import Forum from "./pages/Forum/Forum";
import Teacher from "./pages/Teacher/Teacher";
import TakeCourse from "./pages/Course/TakeCourse";
import TakeQuiz from "./pages/Course/TakeCourse";
import AuthService from "./pages/LoginForm/AuthService";

export const LoginContext = React.createContext({
  setLogin: () => {}
});

class App extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.setLogin = (val) => {
      this.setState({
        isLogin: val
      });
    }
    this.state = {
      isLogin: this.Auth.loggedIn(),
      setLogin: this.setLogin,
    };
  }
  
  render() {
    return (
      <LoginContext.Provider value={ this.state }>
        <BrowserRouter>
          <div>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return this.state.isLogin ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route
                path="/login"
                render={props => {
                  return this.state.isLogin ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <LoginForm {...props} />
                  );
                }}
              />

              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/course"
                component={Course}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/takecourse"
                component={TakeCourse}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/takequiz"
                component={TakeQuiz}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/account"
                component={Account}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/dashboard"
                component={DashBoard}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/messages"
                component={Messages}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/teacher"
                component={Teacher}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/forum"
                component={Forum}
              />
              <PrivateRoute
                isLogin={this.state.isLogin}
                path="/teacher"
                component={Teacher}
              />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </LoginContext.Provider>
    );
  }
}

function PrivateRoute({ component: Component, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
