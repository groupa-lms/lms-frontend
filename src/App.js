import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginForm";
import DashBoard from "./pages/DashBoard/Dashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Course from "./pages/Course/Course";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import Forum from "./pages/Forum/Forum";
import Teacher from "./pages/Teacher/Teacher";

import TakeCourse from "./pages/Course/TakeCourse";
//import TakeQuiz from "./pages/Course/TakeCourse";
import CourseList from "./pages/Course/CourseList";
import CreateCourse from "./pages/Course/CreateCourse";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={DashBoard} exact />
            <Route path="/login" component={LoginForm} />
            <Route path="/course" component={Course} />
            <Route path="/takecourse" component={TakeCourse} />
            {/* <Route path="/takequiz" component={TakeQuiz} /> */}
            <Route path="/courselist" component={CourseList} />
            <Route path="/createcourse" component={CreateCourse} />
            <Route path="/account" component={Account} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/messages" component={Messages} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/forum" component={Forum} />
            <Route path="/teacher" component={Teacher} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
