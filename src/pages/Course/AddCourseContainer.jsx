import React, { Component } from "react";
import Template from "../Template/Template";
import AddCourse from "./AddCourse"
import { withRouter } from 'react-router-dom';

class AddCourseContainer extends Component {
  render() {
    return (
      <Template title="Add Course" history={this.props.history}>
        <AddCourse />
      </Template>
    );
  }
}

export default withRouter(AddCourseContainer);