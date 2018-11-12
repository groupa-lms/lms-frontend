import React, { Component } from "react";
import Template from "../Template/Template";
import AddCourse from "./AddCourse"

class AddCourseContainer extends Component {
  render() {
    return (
      <Template title="Add Course">
        <AddCourse />
      </Template>
    );
  }
}

export default AddCourseContainer;