import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginFormOld";
import DashBoard from "./pages/DashBoard/Dashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Course from "./pages/Course/Course";
import TextFields from "./pages/Course/TextFields";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import Forum from "./pages/Forum/Forum";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={DashBoard} exact />
            <Route path="/login" component={LoginForm} />
            <Route path="/course" component={Course} />
            <Route path="/textFields" component={TextFields} />
            <Route path="/account" component={Account} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/messages" component={Messages} />
            <Route path="/forum" component={Forum} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
