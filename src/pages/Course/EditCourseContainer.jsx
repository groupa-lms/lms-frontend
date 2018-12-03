import React, { Component } from "react";
import Template from "../Template/Template";
import EditCourse from "./EditCourse";
import { withRouter } from 'react-router-dom';

class EditCourseContainer extends Component {
  render() {
    return (
      <Template title="Edit Course">
        <EditCourse courseId={this.props.match.params.id} history={this.props.history}/>
      </Template>
    );
  }
}

export default withRouter(EditCourseContainer);