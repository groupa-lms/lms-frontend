import React, { Component } from "react";
import Template from "../Template/Template";
import AddStudent from "./AddStudent";

class CreateStudent extends Component {
  render() {
    return (
      <Template title="Course">
        <AddStudent />
      </Template>
    );
  }
}

export default CreateStudent;