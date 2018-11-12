import React, { Component } from "react";
import Template from "../Template/Template";
import EditTeacher from "./EditTeacher"

class EditTeacherContainer extends Component {
  render() {
    return (
      <Template title="Edit Teacher">
        <EditTeacher teacherId={this.props.match.params.id}/>
      </Template>
    );
  }
}

export default EditTeacherContainer;