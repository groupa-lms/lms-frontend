import React, { Component } from "react";
import Template from "../Template/Template";
import ViewCourse from "./ViewCourse";
import { withRouter } from 'react-router-dom';

class ViewCourseContainer extends Component {
  render() {
    return (
      <Template title="View Course">
        <ViewCourse courseId={this.props.match.params.id} history={this.props.history}/>
      </Template>
    );
  }
}

export default withRouter(ViewCourseContainer);