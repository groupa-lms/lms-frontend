import React, { Component } from "react";
import Template from "../Template/Template";
import CourseEnroll from "./CourseEnroll"

class CourseEnrollContainer extends Component {
  render() {
    return (
      <Template title="Course Enroll">
        <CourseEnroll />

      </Template>
    );
  }
}

export default CourseEnrollContainer;