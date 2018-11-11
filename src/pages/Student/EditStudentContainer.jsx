import React, { Component } from "react";
import Template from "../Template/Template";
import EditStudent from "./EditStudent"

class EditStudentContainer extends Component {
  render() {
    return (
      <Template title="Edit Student">
        <EditStudent studentId={this.props.match.params.id}/>
      </Template>
    );
  }
}

export default EditStudentContainer;