import React, { Component } from "react";
import Template from "../Template/Template";
import AddCourse from "./AddCourse";

class TakeCourse extends Component {
  render() {
    return (
      <Template title="Course">
        <AddCourse />
      </Template>
    );
  }
}

export default TakeCourse;
