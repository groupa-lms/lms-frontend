import React, { Component } from "react";
import Template from "../Template/Template";
import ListCourse from "./ListCourse"

class ListCourseContainer extends Component {
  render() {
    return (
      <Template title="Edit Course">
        <ListCourse />
      </Template>
    );
  }
}

export default ListCourseContainer;