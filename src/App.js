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

class App extends Component {
  constructor() {
    super();
    this.state = {
      access_token: "start",
      isLogin: false
    };
    this.setToken = this.setToken.bind(this);
  }

  setToken(val) {
    this.setState({
      access_token: val,
      isLogin: true
    });
    console.log("set token");
  }

  render() {
    console.log("islogin: " + this.state.isLogin);
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* <Route path="/" component={DashBoard} exact /> */}
            <Route
              path="/"
              exact
              render={props => {
                return this.state.isLogin ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location }
                    }}
                  />
                );
              }}
            />

            {/* <Route
              path="/login"
              render={props => {
                return this.state.isLogin ? (
                  <Redirect
                    to={{
                      pathname: "/dashboard",
                      state: {
                        isLogin: this.state.isLogin,
                        from: props.location
                      }
                    }}
                  />
                ) : (
                  <LoginForm {...props} setToken={this.setToken} />
                );
              }}
            /> */}

            <Route
              path="/login"
              islogin={this.state.isLogin}
              render={({ islogin, ...props }) => {
                return this.state.isLogin ? (
                  <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                  />
                ) : (
                  <LoginForm setToken={this.setToken} {...props} />
                );
              }}
            />
            {/* <Route
              path="/login"
              render={props => (
                <LoginForm {...props} setToken={this.setToken} />
              )}
            /> */}
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
