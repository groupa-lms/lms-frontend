import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginForm";
import DashBoard from "./pages/DashBoard/Dashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import Forum from "./pages/Forum/Forum";
import Teacher from "./pages/Teacher/Teacher";
import Student from "./pages/Student/Student";
import AddStudent from "./pages/Student/AddStudent";
import ViewStudent from "./pages/Student/ViewStudent";
import EditStudent from "./pages/Student/EditStudent";

import StudentPortal from "./pages/StudentSystem/StudentPortal";
import TeacherPortal from "./pages/TeacherSystem/TeacherPortal";
import AdminPortal from "./pages/AdminSystem/AdminPortal";



import Course from "./pages/Course/Course";
import ViewCourse from "./pages/Course/ViewCourse";
import AddCourse from "./pages/Course/AddCourse";
import EditCourse from "./pages/Course/EditCourse";
import TakeCourse from "./pages/Course/TakeCourse";
import TakeQuiz from "./pages/Course/TakeQuiz";
import AuthService from "./pages/LoginForm/AuthService";
import Register from "./pages/Register/Register";
import ViewTeacher from "./pages/Teacher/ViewTeacher";
import EditTeacher from "./pages/Teacher/EditTeacher";
import CreateTeacher from "./pages/Teacher/CreateTeacher";

export const LoginContext = React.createContext({
  setLogin: () => {}
});

class App extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.setLogin = ( val, role ) => {
      this.setState({
        isLogin: val,
        role: role,
      });
    };
    this.state = {
      role: '',
      isLogin: this.Auth.loggedIn(),
      setLogin: this.setLogin
    };
  }

  render() {
    const { isLogin, role } = this.state;
    return (
      <LoginContext.Provider value={this.state}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return isLogin ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route
                path="/login"
                render={props => {
                  return isLogin ? (
                    ((role === "admin")&&<Redirect to="/admin/portal" />)
                    ||((role === "student")&&<Redirect to="/student/portal" />)
                    ||((role === "teacher")&&<Redirect to="/teacher/portal" />)

                  ) : (
                    <LoginForm {...props} />
                  );
                }}
              />
              <Route path="/register" component={Register} />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/portal"
                component={AdminPortal}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/student/portal"
                component={StudentPortal}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/teacher/portal"
                component={TeacherPortal}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/course"
                component={Course}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/takecourse"
                component={TakeCourse}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/takequiz"
                component={TakeQuiz}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/account"
                component={Account}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/dashboard"
                component={DashBoard}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/messages"
                component={Messages}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/student/list"
                component={Student}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/student/add"
                component={AddStudent}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/student/view/:id"
                component={ViewStudent}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/student/edit/:id"
                component={EditStudent}
              />
               <PrivateRoute
                isLogin={isLogin}
                path="/admin/course/list"
                component={Course}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/course/view/:id"
                component={ViewCourse}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/course/edit/:id"
                component={EditCourse}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/admin/course/add"
                component={AddCourse}
              />
              <PrivateRoute isLogin={isLogin} path="/forum" component={Forum} />
              <PrivateRoute
                isLogin={isLogin}
                path="/teacher/list"
                component={Teacher}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/teacher/view/:id"
                component={ViewTeacher}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/teacher/edit/:id"
                component={EditTeacher}
              />
              <PrivateRoute
                isLogin={isLogin}
                path="/teacher/create"
                component={CreateTeacher}
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
