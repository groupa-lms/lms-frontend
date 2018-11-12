import React, { Component } from "react";
import Template from "../Template/Template";
import AddTeacher from "./AddTeacher"

class AddTeacherContainer extends Component {
  render() {
    return (
      <Template title="Add Teacher">
        <AddTeacher />
      </Template>
    );
  }
}

export default AddTeacherContainer;