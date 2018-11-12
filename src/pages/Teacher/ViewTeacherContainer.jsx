import React, { Component } from "react";
import Template from "../Template/Template";
import ViewTeacher from "./ViewTeacher"

class ViewTeacherContainer extends Component {
  render() {
    return (
      <Template title="List Teacher">
        <ViewTeacher teacherId={this.props.match.params.id}/>
      </Template>
    );
  }
}

export default ViewTeacherContainer;