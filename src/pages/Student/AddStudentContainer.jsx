import React, { Component } from "react";
import Template from "../Template/Template";
import AddStudent from "./AddStudent"

class AddStudentContainer extends Component {
  render() {
    return (
      <Template title="Add Student">
        <AddStudent />
      </Template>
    );
  }
}

export default AddStudentContainer;