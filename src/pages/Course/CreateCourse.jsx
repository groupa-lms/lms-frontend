import React, { Component } from "react";
import Template from "../Template/Template";
import AddCourse from "./AddCourse";

class CreateCourse extends Component {
  render() {
    return (
      <Template title="Course">
        <AddCourse />
      </Template>
    );
  }
}

export default CreateCourse;
