import React, { Component } from "react";
import Template from "../Template/Template";
import ListCourse from "./ListCourse";
import { withRouter } from 'react-router-dom';

class ListCourseContainer extends Component {
  render() {
    return (
      <Template title="Edit Course">
        <ListCourse history={this.props.history}/>
      </Template>
    );
  }
}

export default withRouter(ListCourseContainer);