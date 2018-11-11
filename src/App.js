import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginForm";
import DashBoard from "./pages/DashBoard/Dashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import Forum from "./pages/Forum/Forum";
import Teacher from "./pages/Teacher/Teacher";
import CourseList from "./pages/Course/CourseList";
import StudentSystem from "./pages/Student/StudentSystem";
import TeacherSystem from "./pages/Teacher/TeacherSystem";
import Student from "./pages/StudentRole/Student";
import AddStudentContainer from "./pages/Student/AddStudentContainer";
import EditStudentContainer from "./pages/Student/EditStudentContainer";
import ListStudentContainer from "./pages/Student/ListStudentContainer";
import ViewStudentContainer from "./pages/Student/ViewStudentContainer";
import ViewStudent from "./pages/Student/ViewStudent";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={DashBoard} exact />
            <Route path="/login" component={LoginForm} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/admin/course/list" component={CourseList} />
            <Route path="/admin/student/list" component={StudentSystem} />
            <Route path="/admin/teacher/list" component={TeacherSystem} />

            <Route path="/admin/student/list" component={ListStudentContainer} />
            <Route path="/admin/student/edit/:id" component={EditStudentContainer} />
            <Route path="/admin/student/add" component={AddStudentContainer} />
            <Route path="/admin/student/view/:id" component={ViewStudentContainer} />
            
            <Route path="/student" component={Student} />
            <Route path="/teacher" component={Teacher} />
            <Route component={ErrorPage} />
            {/* <Route path="/account" component={Account} /> */}
            
            {/* <Route path="/messages" component={Messages} /> */}
            {/* <Route path="/forum" component={Forum} /> */}
            
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
