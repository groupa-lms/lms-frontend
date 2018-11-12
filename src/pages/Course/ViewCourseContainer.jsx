import React, { Component } from "react";
import Template from "../Template/Template";
import ViewCourse from "./ViewCourse"

class ViewCourseContainer extends Component {
  render() {
    return (
      <Template title="View Course">
        <ViewCourse courseId={this.props.match.params.id}/>
      </Template>
    );
  }
}

export default ViewCourseContainer;