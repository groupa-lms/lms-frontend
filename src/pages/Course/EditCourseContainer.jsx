import React, { Component } from "react";
import Template from "../Template/Template";
import EditCourse from "./EditCourse"

class EditCourseContainer extends Component {
  render() {
    return (
      <Template title="Edit Course">
        <EditCourse courseId={this.props.match.params.id}/>
      </Template>
    );
  }
}

export default EditCourseContainer;