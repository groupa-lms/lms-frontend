import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginForm";
import DashBoard from "./pages/DashBoard/Dashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import Forum from "./pages/Forum/Forum";
import Teacher from "./pages/Teacher/Teacher";
import Student from "./pages/StudentRole/Student";

import AddStudentContainer from "./pages/Student/AddStudentContainer";
import EditStudentContainer from "./pages/Student/EditStudentContainer";
import ListStudentContainer from "./pages/Student/ListStudentContainer";
import ViewStudentContainer from "./pages/Student/ViewStudentContainer";

import AddTeacherContainer from "./pages/Teacher/AddTeacherContainer";
import EditTeacherContainer from "./pages/Teacher/EditTeacherContainer";
import ListTeacherContainer from "./pages/Teacher/ListTeacherContainer";
import ViewTeacherContainer from "./pages/Teacher/ViewTeacherContainer";

import AddCourseContainer from "./pages/Course/AddCourseContainer";
import EditCourseContainer from "./pages/Course/EditCourseContainer";
import ListCourseContainer from "./pages/Course/ListCourseContainer";
import ViewCourseContainer from "./pages/Course/ViewCourseContainer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={DashBoard} exact />
            <Route path="/login" component={LoginForm} />
            <Route path="/dashboard" component={DashBoard} />

            <Route path="/admin/course/list" component={ListCourseContainer} />
            <Route path="/admin/course/edit/:id" component={EditCourseContainer} />
            <Route path="/admin/course/add" component={AddCourseContainer} />
            <Route path="/admin/course/view/:id" component={ViewCourseContainer} />

            <Route path="/admin/student/list" component={ListStudentContainer} />
            <Route path="/admin/student/edit/:id" component={EditStudentContainer} />
            <Route path="/admin/student/add" component={AddStudentContainer} />
            <Route path="/admin/student/view/:id" component={ViewStudentContainer} />

            <Route path="/admin/teacher/list" component={ListTeacherContainer} />
            <Route path="/admin/teacher/edit/:id" component={EditTeacherContainer} />
            <Route path="/admin/teacher/add" component={AddTeacherContainer} />
            <Route path="/admin/teacher/view/:id" component={ViewTeacherContainer} />
            
            <Route path="/student" component={Student} />
            <Route path="/teacher" component={Teacher} />
            <Route component={ErrorPage} />
            <Route path="/account" component={Account} /> 
            <Route path="/messages" component={Messages} /> 
            <Route path="/forum" component={Forum} /> 
            
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
