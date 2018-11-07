import React, { Component } from "react";
import Template from "../Template/Template";
import AddTeacher from "./AddTeacher";

class CreateTeacher extends Component {
  render() {
    return (
      <Template title="Course">
        <AddTeacher />
      </Template>
    );
  }
}

export default CreateTeacher;